import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Song } from '../models/songs.model.js';
import { Album } from '../models/albums.model.js';
import { Playlist } from '../models/playlists.model.js';
import fs from 'fs/promises';
import fss from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let files;

// Read Directory
export const readDirectory = async () => {
    try {
        files = await fs.readdir(path.join(__dirname, "../../", 'public', 'media'));
    } catch (error) {
        console.error('Error reading directory:', error);
    }
};

// song database document updater
export const updateSongs = AsyncHandler(async (req, res) => {
    await readDirectory();
    if (!files) {
        return res.status(500).send('Error reading files');
    }

    try {
        let fetchSongs = [];
        let fetchAlbums = [];

        const processFolder = async (folder) => {
            const insideFolder = await fs.readdir(path.join(__dirname, "../../", 'public', 'media', folder));
            const mp3Files = insideFolder.filter(file => file.endsWith(".mp3"));
            const jpgFiles = insideFolder.filter(file => file.endsWith(".jpg"));

            let albumData = await Album.findOne({ folderName: folder });
            if (!albumData) {
                albumData = await Album.create({
                    folderName: folder,
                    img: jpgFiles[0] ? `http://localhost:3000/media/${folder}/${jpgFiles[0]}` : ''
                });
                fetchAlbums.push(albumData);
            }

            const songPromises = mp3Files.map(async (mp3File) => {
                const existingSong = await Song.findOne({ media: `http://localhost:3000/media/${folder}/${mp3File}` });
                if (existingSong) return null;

                const filePath = path.join(__dirname, "../../", 'public', 'media', folder, mp3File);
                const stats = await fs.stat(filePath);
                const baseName = path.basename(mp3File, path.extname(mp3File));
                const img = jpgFiles.find(image => image.startsWith(baseName)) || jpgFiles[0] || '';

                const songData = {
                    media: `http://localhost:3000/media/${folder}/${mp3File}`,
                    img: `http://localhost:3000/media/${folder}/${img}`,
                    title: baseName.split(" - ")[0] || "Title not found",
                    desc: baseName.split(" - ")[1] || "Desc not found",
                    size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
                    albumId: albumData._id
                };

                return songData;
            });

            const songs = await Promise.all(songPromises);
            const newSongs = songs.filter(song => song !== null);
            if (newSongs.length > 0) {
                const createdSongs = await Song.insertMany(newSongs);
                fetchSongs.push(...createdSongs);

                await Album.findByIdAndUpdate(albumData._id, {
                    $addToSet: { songs: { $each: createdSongs.map(song => song._id) } }
                });
            }
        };

        const filteredFiles = files.filter(elem=>elem !== "New");
        await Promise.all(filteredFiles.map(processFolder));

        res.status(200).json(new ApiResponse(200, { songs: fetchSongs, albums: fetchAlbums }, "All Songs"));
    } catch (error) {
        console.error('Error updating songs and albums:', error);
        return res.status(500).json(new ApiError(500, "Error updating songs and albums"));
    }
});

// fetch all songs from database
export const fetchSongs = AsyncHandler(async(req, res)=>{
    try {
        const songs = await Song.find().populate("albumId");
        if(songs){
            return res.status(200).json(new ApiResponse(200, songs, "All Songs"))
        }
        return res.status(400).json(new ApiError(400, "Songs not found"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Error fetching songs"));
    }
})

// fetch all album from database
export const fetchAlbums = AsyncHandler(async(req, res)=>{
    try {
        const albums = await Album.find().populate("songs");
        if(albums){
            return res.status(200).json(new ApiResponse(200, albums, "All Albums"))
        }
        return res.status(400).json(new ApiError(400, "Albums not found"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Error fetching albums"));
    }
})

// find individual album with songs
export const findAlbum = AsyncHandler(async (req, res) => {
    try {
        const { songId } = req.params;
        const findAlbum = await Album.findOne({
            folderName: songId
        }).populate("songs");

        if (!findAlbum) {
            return res.status(404).json(new ApiError(404, `Album with folder name ${songId} not found`));
        }

        res.status(200).json(new ApiResponse(200, findAlbum, `All available songs inside album ${findAlbum.folderName}`))
    } catch (error) {
        console.log(error)
        res.status(500).json(new ApiError(500, "Error finding album"))
    }
})

// find song
export const findSong = AsyncHandler(async(req, res)=>{
    const {songName} = req.body;
    console.log(req.user)
    const song = await Song.find({title : new RegExp(`${songName}`, 'i')});
    const album = await Album.find({folderName : new RegExp(`${songName}`, 'i')});
    const playlist = await Playlist.find({playlistTitle : new RegExp(`${songName}`, 'i'), owner: req.user?._id});
    if(!song && !album && !playlist){
        return res.status(400).json(new ApiError(400, "not found"));
    };
    return res.status(200).json(new ApiResponse(200, {songs: song.length!==0? song : null, albums: album.length!==0? album : null, playlists: playlist.length!==0? playlist : null}, "Found"))
});

// add new song 
export const addSong = AsyncHandler(async (req, res) => {
    await readDirectory();
    const { newMediaTitle, newMediaTitleDesc, newMediaAlbum } = req.body;
    const newSongPath = req.files.newSong[0];
    const newSongCoverPath = req.files.newSongCover[0];
    const sourceDir = path.join(__dirname, "../../", 'public', 'media', 'New');
    const insideFolder = await fs.readdir(sourceDir);
    const destDir = path.join(__dirname, "../../", 'public', 'media', newMediaAlbum);

    if (files.includes(newMediaAlbum)) {
        // Album folder already exists
        if (!fss.existsSync(path.join(destDir, `${newMediaTitle} - ${newMediaTitleDesc}.jpg`)) && !fss.existsSync(path.join(destDir, `${newMediaTitle} - ${newMediaTitleDesc}.mp3`))) {
            try {
                for (let item of insideFolder) {
                    const srcPath = path.join(sourceDir, item);
                    const extName = path.extname(item);
                    const destPath = path.join(destDir, `${newMediaTitle} - ${newMediaTitleDesc}${extName}`);
                    await fs.rename(srcPath, destPath, (err) => {
                        if (err) {
                            console.error('Error moving file:', err);
                        } else {
                            console.log('File moved successfully');
                        }
                    });

                }
            } catch (err) {
                console.error('Error moving files:', err);
            }
        } else {
            await fs.unlink(path.join(sourceDir, newSongPath.filename));
            await fs.unlink(path.join(sourceDir, newSongCoverPath.filename));
        }
    } else {
        // Create the new album folder
        try {
            await fs.mkdir(destDir, { recursive: true });
            for (let item of insideFolder) {
                const srcPath = path.join(sourceDir, item);
                const extName = path.extname(item);
                const destPath = path.join(destDir, `${newMediaTitle} - ${newMediaTitleDesc}${extName}`);
                await fs.rename(srcPath, destPath);
            }
            console.log('Files moved successfully');
        } catch (err) {
            console.error('Error creating folder or moving files:', err);
        }
    }

    // res.status(200).json(new ApiResponse(200, [], "Media file added successfully"));
    await updateSongs(req, res);
});