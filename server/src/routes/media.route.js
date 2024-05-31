import { Router } from "express";
import {mediaSongs, mediaAlbum, findSongs} from '../controllers/media.controller.js';

export const mediaRouter = Router();

mediaRouter.get("/songs", mediaSongs);

mediaRouter.get("/albums", mediaAlbum);

mediaRouter.get("/find/:songId", findSongs);