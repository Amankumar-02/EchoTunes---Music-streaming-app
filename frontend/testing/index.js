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
        files = await fs.readdir(__dirname, "02");
    } catch (error) {
        console.error('Error reading directory:', error);
    }
};

const testt = async()=>{
    // await readDirectory();
    // console.log(files)
    // await fs.mkdir(path.join(__dirname, "02"))
    // await fs.writeFile(path.join(__dirname, "02", "file01.js"), `console.log("hello")`)
    await fs.rename(path.join(__dirname, "01", "file01.js"), path.join(__dirname, "01", "file001.js"), (err)=>{
        if(err) throw err;
        console.log("Done")
    })
}

testt();