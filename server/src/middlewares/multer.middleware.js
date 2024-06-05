import multer from "multer";
// this inbuild package of node core module 
// import path from 'path';

// console.log(path.extname("abcd.txt"))

// add user profile image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/media/New')
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 100) + file.originalname)
    }
});
export const upload = multer({ storage: storage });

// add song
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/media/New')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
export const upload2 = multer({ storage: storage2 });

// add song cover image
const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/media/New')
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 100) + file.originalname)
    }
});
export const upload3 = multer({ storage: storage3 });