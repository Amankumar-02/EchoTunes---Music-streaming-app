import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static("public"));

let files;
const readDirectory = async () => {
  try {
    files = await fs.readdir(path.join(__dirname, 'public', 'songs'));
  } catch (error) {
    console.error('Error reading directory:', error);
  }
};

app.get("/songs", async (req, res) => {
  if (!files) {
    return res.status(500).send('Error reading files');
  }
  const mp3File = files.filter(item => item.includes(".mp3"));
  const jpgFile = files.filter(item => item.includes(".jpg"));
  try {
    let fileDetails = await Promise.all(mp3File.map(async (file) => {
      let filePath = path.join(__dirname, 'public', 'songs', file);
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
    res.json(fileDetails);
  } catch (error) {
    console.error('Error reading file details:', error);
    res.status(500).send('Error reading file details');
  }
});

readDirectory().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
