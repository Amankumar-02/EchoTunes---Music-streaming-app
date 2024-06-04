import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Song } from '../models/songs.model.js';
import { Album } from '../models/albums.model.js';
import fs from 'fs/promises';
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

        await Promise.all(files.map(processFolder));

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