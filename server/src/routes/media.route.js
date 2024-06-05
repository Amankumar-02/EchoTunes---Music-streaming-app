import { Router } from "express";
// import {mediaSongs, mediaAlbum, findSongs} from '../controllers/mediaLocal.controller.js';
import {updateSongs, fetchSongs, fetchAlbums, findAlbum, addSong} from '../controllers/mediaDatabase.controller.js';
import { upload, upload2, upload3 } from "../middlewares/multer.middleware.js";
import { isLoggedOut } from "../middlewares/auth.middleware.js";

export const mediaRouter = Router();

// for local media
// mediaRouter.get("/songs", mediaSongs);
// mediaRouter.get("/albums", mediaAlbum);
// mediaRouter.get("/find/:songId", findSongs);


// for server media
mediaRouter.get("/updateSongs", updateSongs);
mediaRouter.get("/songs", fetchSongs);
mediaRouter.get("/albums", fetchAlbums);
mediaRouter.get("/find/:songId", findAlbum);

// mediaRouter.post("/addMedia", isLoggedOut, upload2.fields('newSong', 'newSongCover'), addSong)
mediaRouter.post("/addMedia", isLoggedOut, upload2.fields([{ name: 'newSong', maxCount: 1 }, { name: 'newSongCover', maxCount: 1 }]), addSong)