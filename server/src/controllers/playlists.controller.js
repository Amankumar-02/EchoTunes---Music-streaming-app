import { Playlist } from "../models/playlists.model.js";
import { Song } from '../models/songs.model.js';
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const createPlaylist = AsyncHandler(async (req, res) => {
    const { songId, playlistName } = req.body;
    const song = await Song.findById(songId);
    const exist = await Playlist.findOne({ playlistTitle: playlistName });
    let result = []
    if (exist) {
        result = await Playlist.findByIdAndUpdate(exist._id, {
            $addToSet: { personalisedSongs: song._id }
        })
    } else {
        result = await Playlist.create({
            playlistTitle: playlistName,
            coverImg: song.img ? song.img : "https://notionthings.com/wp-content/uploads/2021/01/Random-Cover-Image-on-Page-Refresh-7-1024x680.jpeg",
            owner: req.user?._id,
            personalisedSongs: song._id
        })
        await User.findByIdAndUpdate(req.user?._id, {
            $addToSet: {playlists: result._id}
        })
    }
    return res.status(200).json(new ApiResponse(200, result, "playlist created successfully"))
});

export const allPlaylists = AsyncHandler(async(req, res)=>{
    const playLists = await Playlist.find();
    if(!playLists || playLists.length === 0){
        return res.status(400).json(new ApiError(400, "Playlists not found"));
    }
    const filteredUsers = playLists.filter(elem=>elem.owner.toString() === req.user?._id.toString());
    return res.status(200).json(new ApiResponse(200, filteredUsers, "All playlists"))
});

export const playlistMedia = AsyncHandler(async(req, res)=>{
    const {playlistId} = req.params;
    const result = await Playlist.findById(playlistId).populate("personalisedSongs");
    if(!result){
        return res.status(400).json(new ApiError(400, "Playlists not found"))
    }
    return res.status(200).json(new ApiResponse(200, result, "Result"))
});