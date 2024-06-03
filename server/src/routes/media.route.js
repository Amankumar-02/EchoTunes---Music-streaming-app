import { Router } from "express";
// import {mediaSongs, mediaAlbum, findSongs} from '../controllers/mediaLocal.controller.js';
import {updateSongs, fetchSongs, fetchAlbums, findAlbum} from '../controllers/mediaDatabase.controller.js';

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