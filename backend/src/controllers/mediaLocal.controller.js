import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { MAIN_URL } from '../utils.js';
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

export const mediaSongs = AsyncHandler(async (req, res) => {
    await readDirectory();
    if (!files) {
        return res.status(500).send('Error reading files');
    }

    try {
        let final = [];

        const fileDetailsPromises = files.map(async (file) => {
            let songs = await fs.readdir(path.join(__dirname, "../../", "public", "media", file));

            // Filtering the file extensions
            const mp3File = songs.filter(item => item.includes(".mp3"));
            const jpgFile = songs.filter(item => item.includes(".jpg"));

            const fileDetails2Promises = mp3File.map(async (file2) => {
                let filePath = path.join(__dirname, "../../", 'public', 'media', file, file2);
                let stats = await fs.stat(filePath);
                const baseName = file2.split('.')[0];
                let img = jpgFile.find(image => image.startsWith(baseName)) || jpgFile[0] || '';

                final.push({
                    media: `${MAIN_URL}media/${file}/${file2}`,
                    img: `${MAIN_URL}media/${file}/${img}`,
                    title: baseName.split(" - ")[0] || "Title not found",
                    desc: baseName.split(" - ")[1] || "Desc not found",
                    size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
                    createdAt: stats.birthtime,
                    updatedAt: stats.mtime,
                });
            });

            await Promise.all(fileDetails2Promises);
        });

        await Promise.all(fileDetailsPromises);

        // Mapped array
        res.status(200).json(new ApiResponse(200, final, "All Songs"));
    } catch (error) {
        console.error('Error reading file details:', error);
        res.status(500).json(new ApiError(500, "Error reading file details"));
    }
});

export const mediaAlbum = AsyncHandler(async (req, res) => {
    await readDirectory();
    if (!files) {
        return res.status(500).send('Error reading files');
    }

    // mapping the objects in array
    try {
        let fileDetails = await Promise.all(files.map(async (file) => {
            let songs = await fs.readdir(path.join(__dirname, "../../", "public", "media", file))

            // filtering the file extensions
            const jpgFile = songs.filter(item => item.includes(".jpg"));
            return {
                folderName: file,
                img: `${MAIN_URL}media/${file}/${jpgFile[0]}`,
            }
        }));
        // mapped array
        res.status(200).json(new ApiResponse(200, fileDetails, "All Albums"))
    } catch (error) {
        console.error('Error reading file details:', error);
        res.status(500).json(new ApiError(500, "Error reading file details"))
    }
});

export const findSongs = AsyncHandler(async (req, res) => {
    await readDirectory();
    if (!files) {
        return res.status(500).send('Error reading files');
    }

    // mapping the objects in array
    try {
        let fileDetails = await Promise.all(files.map(async (file) => {
            let songs = await fs.readdir(path.join(__dirname, "../../", "public", "media", file))

            // filtering the file extensions
            const mp3File = songs.filter(item => item.includes(".mp3"));
            const jpgFile = songs.filter(item => item.includes(".jpg"));

            // mapping the objects in array 2
            let fileDetails2 = await Promise.all(mp3File.map(async (file2) => {
                let filePath = path.join(__dirname, "../../", 'public', 'media', file, file2);
                let stats = await fs.stat(filePath);
                const baseName = file2.split('.')[0];
                let img = jpgFile.find(image => image.startsWith(baseName)) || jpgFile[0] || '';
                return {
                    media: `${MAIN_URL}media/${file}/${file2}`,
                    img: `${MAIN_URL}media/${file}/${img}`,
                    title: baseName.split(" - ")[0] || "Title not found",
                    desc: baseName.split(" - ")[1] || "Desc not found",
                    size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
                    createdAt: stats.birthtime,
                    updatedAt: stats.mtime,
                }
            }));
            return {
                folderName: file,
                img: `${MAIN_URL}media/${file}/${jpgFile[0]}`,
                songs: fileDetails2
            }
        }));

        // before sending filter the album
        const filteredAlbum = fileDetails.filter(item => item.folderName === req.params.songId)
        // // mapped array
        res.status(200).json(new ApiResponse(200, filteredAlbum[0], `All available songs inside album ${filteredAlbum[0].folderName}`))
    } catch (error) {
        console.error('Error reading file details:', error);
        res.status(500).json(new ApiError(500, "Error reading file details"))
    }
});