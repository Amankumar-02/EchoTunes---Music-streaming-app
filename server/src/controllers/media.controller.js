import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// files ==> homeSongs
let files;
// files ==> albumSongs
let files2;
// Read Directory
export const readDirectory = async () => {
    try {
        files = await fs.readdir(path.join(__dirname, "../../", 'public', 'songs'));
        files2 = await fs.readdir(path.join(__dirname, "../../", 'public', 'albums'));
    } catch (error) {
        console.error('Error reading directory:', error);
    }
};

export const mediaSongs = AsyncHandler(async (req, res) => {
    if (!files) {
        return res.status(500).send('Error reading files');
    }
    // filtering the file extensions
    const mp3File = files.filter(item => item.includes(".mp3"));
    const jpgFile = files.filter(item => item.includes(".jpg"));

    // mapping the objects in array
    try {
        let fileDetails = await Promise.all(mp3File.map(async (file) => {
            let filePath = path.join(__dirname, "../../", 'public', 'songs', file);
            let stats = await fs.stat(filePath);
            const baseName = file.split('.')[0];
            let img = jpgFile.find(image => image.startsWith(baseName)) || '';

            return {
                media: `http://localhost:3000/songs/${file}`,
                img: `http://localhost:3000/songs/${img}`,
                title: baseName.split(" - ")[0] || "Title not found",
                desc: baseName.split(" - ")[1] || "Desc not found",
                size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
                createdAt: stats.birthtime,
                updatedAt: stats.mtime,
            }
        }));
        // mapped array
        res.status(200).json(new ApiResponse(200, fileDetails, "All Songs"))
    } catch (error) {
        console.error('Error reading file details:', error);
        res.status(500).json(new ApiError(500, "Error reading file details"))
    }
})

export const mediaAlbum = AsyncHandler(async (req, res) => {
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

export const findSongs = AsyncHandler(async (req, res) => {
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