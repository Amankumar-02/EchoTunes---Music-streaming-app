import { Router } from "express";
// import {mediaSongs, mediaAlbum, findSongs} from '../controllers/mediaLocal.controller.js';
import {updateSongs, fetchSongs, mediaAlbum2, findSongs2} from '../controllers/mediaDatabase.controller.js';

export const mediaRouter = Router();

// mediaRouter.get("/songs", mediaSongs);

// mediaRouter.get("/albums", mediaAlbum);

// mediaRouter.get("/find/:songId", findSongs);

mediaRouter.get("/updateSongs", updateSongs);
mediaRouter.get("/songs", fetchSongs);

mediaRouter.get("/albums", mediaAlbum2);

mediaRouter.get("/find/:songId", findSongs2);