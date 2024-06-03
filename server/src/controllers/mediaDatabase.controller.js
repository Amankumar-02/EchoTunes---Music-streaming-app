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
        await Song.deleteMany();
        await Album.deleteMany();
        let fetchSongs = [];
        let fetchAlbums = [];
        for(const folder of files){
            let tempSongs = [];
            const insideFolder = await fs.readdir(path.join(__dirname, "../../", 'public', 'media', folder));
            const mp3Files = insideFolder.filter(file => file.includes(".mp3"));
            const jpgFiles = insideFolder.filter(file => file.includes(".jpg"));

            for(const mp3File of mp3Files){
                const filePath = path.join(__dirname, "../../", 'public', 'media', folder, mp3File);
                const stats = await fs.stat(filePath);
                const baseName = mp3File.split('.')[0];
                const img = jpgFiles.find(image => image.startsWith(baseName)) || jpgFiles[0] || "";

                const songData = await Song.create({
                    media: `http://localhost:3000/media/${folder}/${mp3File}`,
                    img: `http://localhost:3000/media/${folder}/${img}`,
                    title: baseName.split(" - ")[0] || "Title not found",
                    desc: baseName.split(" - ")[1] || "Desc not found",
                    size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
                });

                fetchSongs.push(songData);
                tempSongs.push(songData);
            }

            const albumData = await Album.create({
                folderName: folder,
                img: jpgFiles[0] ? `http://localhost:3000/media/${folder}/${jpgFiles[0]}` : '',
                songs: tempSongs.map(song=>song),
            })
            fetchAlbums.push(albumData);

            // for (const song of tempSongs) {
            //     await Album.findByIdAndUpdate(albumData._id, {
            //         $addToSet: { songsId: song._id }
            //     });
            // }
        }
        res.status(200).json(new ApiResponse(200, {songs:fetchSongs, albums: fetchAlbums}, "All Songs"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Error reading file details"));
    }
})

// fetch all songs from database
export const fetchSongs = AsyncHandler(async(req, res)=>{
    try {
        const songs = await Song.find();
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
        const albums = await Album.find();
        if(albums){
            return res.status(200).json(new ApiResponse(200, albums, "All Albums"))
        }
        return res.status(400).json(new ApiError(400, "Albums not found"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Error fetching albums"));
    }
})

export const findAlbum = AsyncHandler(async (req, res) => {
    try {
        const { songId } = req.params;
        const findAlbum = await Album.findOne({
            folderName: songId
        }).populate("songsId")

        if (!findAlbum) {
            return res.status(404).json(new ApiError(404, `Album with folder name ${songId} not found`));
        }

        res.status(200).json(new ApiResponse(200, findAlbum, `All available songs inside album ${findAlbum.folderName}`))
    } catch (error) {
        res.status(500).json(new ApiError(500, "Error finding album"))
    }
})