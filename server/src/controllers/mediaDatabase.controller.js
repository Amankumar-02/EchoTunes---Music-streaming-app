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

// files ==> homeSongs
let files;
// files ==> albumSongs
let files2;
let files3;
// Read Directory
export const readDirectory = async () => {
    try {
        files = await fs.readdir(path.join(__dirname, "../../", 'public', 'songs'));
        files2 = await fs.readdir(path.join(__dirname, "../../", 'public', 'albums'));
        files3 = await fs.readdir(path.join(__dirname, "../../", 'public', 'backend', 'song'));
    } catch (error) {
        console.error('Error reading directory:', error);
    }
};

// song database document updater 
export const updateSongs = AsyncHandler(async (req, res) => {
    if (!files3) {
        return res.status(500).send('Error reading files');
    }
    try {
        await Song.deleteMany();
        let newData = [];
        for(const item of files3){
            const insideFolder = await fs.readdir(path.join(__dirname, "../../", 'public', 'backend', 'song', item));
            const mp3File = insideFolder.filter(item => item.includes(".mp3"));
            const jpgFile = insideFolder.filter(item => item.includes(".jpg"));

            for(const item2 of mp3File){
                const filePath = path.join(__dirname, "../../", 'public', 'backend', 'song', item, item2);
                const stats = await fs.stat(filePath);
                const baseName = item2.split('.')[0];
                console.log("baseName", baseName)
                const img = jpgFile.find(image => image.startsWith(baseName)) || jpgFile;
                const songData = await Song.create({
                    media: `http://localhost:3000/backend/song/${item}/${item2}`,
                    img: `http://localhost:3000/backend/song/${item}/${img}`,
                    title: baseName.split(" - ")[0] || "Title not found",
                    desc: baseName.split(" - ")[1] || "Desc not found",
                    size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
                });

                newData.push(songData);
            }
        }
        res.status(200).json(new ApiResponse(200, newData, "All Songs"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Error reading file details"));
    }
})

// fetch all songs from database
export const fetchSongs = AsyncHandler(async(req, res)=>{
    const songs = await Song.find();
    if(songs){
        return res.status(200).json(new ApiResponse(200, songs, "All Songs"))
    }
    return res.status(400).json(new ApiError(400, "Songs not found"))
})

export const mediaAlbum2 = AsyncHandler(async (req, res) => {
    if (!files2) {
        return res.status(500).send('Error reading files');
    }

    // mapping the objects in array
    try {
        let fileDetails = await Promise.all(files2.map(async (file) => {
            let songs = await fs.readdir(path.join(__dirname, "../../", "public", "albums", file))

            // filtering the file extensions
            const mp3File = songs.filter(item => item.includes(".mp3"));
            const jpgFile = songs.filter(item => item.includes(".jpg"));

            // mapping the objects in array 2
            let fileDetails2 = await Promise.all(mp3File.map(async (file2) => {
                let filePath = path.join(__dirname, "../../", 'public', 'albums', file, file2);
                let stats = await fs.stat(filePath);
                const baseName = file2.split('.')[0];
                let img = jpgFile.find(image => image.startsWith(file)) || '';
                return {
                    media: `http://localhost:3000/albums/${file}/${file2}`,
                    img: `http://localhost:3000/albums/${file}/${img}`,
                    title: baseName.split(" - ")[1] || "Title not found",
                    desc: baseName.split(" - ")[0] || "Desc not found",
                    size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
                    createdAt: stats.birthtime,
                    updatedAt: stats.mtime,
                }
            }));

            return {
                folderName: file,
                songs: fileDetails2
            }
        }));
        // mapped array
        res.status(200).json(new ApiResponse(200, fileDetails, "All Albums"))
    } catch (error) {
        console.error('Error reading file details:', error);
        res.status(500).json(new ApiError(500, "Error reading file details"))
    }
})

export const findSongs2 = AsyncHandler(async (req, res) => {
    if (!files2) {
        return res.status(500).send('Error reading files');
    }

    // mapping the objects in array
    try {
        let fileDetails = await Promise.all(files2.map(async (file) => {
            let songs = await fs.readdir(path.join(__dirname, "../../", "public", "albums", file))

            // filtering the file extensions
            const mp3File = songs.filter(item => item.includes(".mp3"));
            const jpgFile = songs.filter(item => item.includes(".jpg"));

            // mapping the objects in array 2
            let fileDetails2 = await Promise.all(mp3File.map(async (file2) => {
                let filePath = path.join(__dirname, "../../", 'public', 'albums', file, file2);
                let stats = await fs.stat(filePath);
                const baseName = file2.split('.')[0];
                let img = jpgFile.find(image => image.startsWith(file)) || '';
                return {
                    media: `http://localhost:3000/albums/${file}/${file2}`,
                    img: `http://localhost:3000/albums/${file}/${img}`,
                    title: baseName.split(" - ")[1] || "Title not found",
                    desc: baseName.split(" - ")[0] || "Desc not found",
                    size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
                    createdAt: stats.birthtime,
                    updatedAt: stats.mtime,
                }
            }));
            return {
                folderName: file,
                songs: fileDetails2
            }
        }));

        // before sending filter the album
        const filteredAlbum = fileDetails.filter(item => item.folderName === req.params.songId)
        // // mapped array
        res.status(200).json(new ApiResponse(200, filteredAlbum[0].songs, `All available songs inside album ${filteredAlbum[0].folderName}`))
    } catch (error) {
        console.error('Error reading file details:', error);
        res.status(500).json(new ApiError(500, "Error reading file details"))
    }
})