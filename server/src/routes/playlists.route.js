import { Router } from "express";
import {createPlaylist, soloCreatePlaylist, allPlaylists, playlistMedia} from '../controllers/playlists.controller.js';
// import { isLoggedOut } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const playlistRouter = Router();

// for server media
playlistRouter.post("/createPlaylist", verifyJWT, createPlaylist);
playlistRouter.post("/soloCreatePlaylist", verifyJWT, soloCreatePlaylist);
playlistRouter.get("/allPlaylists", verifyJWT, allPlaylists);
playlistRouter.post("/playlist/:playlistId", verifyJWT, playlistMedia);