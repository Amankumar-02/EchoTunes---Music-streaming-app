import { Playlist } from "../models/playlists.model.js";
import { Song } from '../models/songs.model.js';
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

// create when song like btn trigger
export const createPlaylist = AsyncHandler(async (req, res) => {
    const { songId, playlistName } = req.body;
    const song = await Song.findById(songId);
    const exist = await Playlist.findOne({ playlistTitle: playlistName, owner: req.user?._id });
    let result = []
    if (exist) {
        const songExist = await Playlist.findOne({
            personalisedSongs: songId, owner: req.user?._id
        });
        if (songExist) {
            return res.status(401).json(new ApiError(401, "Song is already added in this playlist"))
        };
        result = await Playlist.findByIdAndUpdate(exist._id, {
            $addToSet: { personalisedSongs: song._id }
        });
        await User.findByIdAndUpdate(req.user?._id, {
            $addToSet: { songs: songId }
        });
    } else {
        result = await Playlist.create({
            playlistTitle: playlistName,
            coverImg: song.img ? song.img : "https://notionthings.com/wp-content/uploads/2021/01/Random-Cover-Image-on-Page-Refresh-7-1024x680.jpeg",
            owner: req.user?._id,
            personalisedSongs: song._id
        })
        await User.findByIdAndUpdate(req.user?._id, {
            $addToSet: { playlists: result._id, songs: songId }
        })
    }
    return res.status(200).json(new ApiResponse(200, result, "playlist created successfully"))
});

// create when create playlist btn trigger
export const soloCreatePlaylist = AsyncHandler(async (req, res) => {
    const { playlistName } = req.body;
    const exist = await Playlist.findOne({ playlistTitle: playlistName });
    if (exist) {
        return res.status(400).json(new ApiError(400, "Playlist is already exist"))
    };
    const result = await Playlist.create({
        playlistTitle: playlistName,
        coverImg: "noImg",
        owner: req.user?._id,
    })
    if (!result) {
        return res.status(400).json(new ApiError(400, "Error"))
    }
    await User.findByIdAndUpdate(req.user?._id, {
        $addToSet: { playlists: result._id }
    })
    return res.status(200).json(new ApiResponse(200, result, "Playlist is created successfully"));
});

// find all playlist against which user is create
export const allPlaylists = AsyncHandler(async (req, res) => {
    const playLists = await Playlist.find();
    if (!playLists || playLists.length === 0) {
        return res.status(400).json(new ApiError(400, "Playlists not found"));
    }
    const filteredUsers = playLists.filter(elem => elem.owner.toString() === req.user?._id.toString());
    return res.status(200).json(new ApiResponse(200, filteredUsers, "All playlists"))
});

// find all playlist with playlistId
export const playlistMedia = AsyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const result = await Playlist.findById(playlistId).populate("personalisedSongs");
    if (!result) {
        return res.status(400).json(new ApiError(400, "Playlists not found"))
    }
    if (result?.owner.toString() !== req.user?._id.toString()) {
        return res.status(400).json(new ApiError(400, "Playlists not found"))
    }
    return res.status(200).json(new ApiResponse(200, result, "Result"))
});

export const removePlaylistSong = AsyncHandler(async (req, res) => {
    const { songId } = req.body;

    try {
        const checkPlaylistItemLength = await Playlist.findOne({ owner: req.user?._id, personalisedSongs: songId });
        if (checkPlaylistItemLength.personalisedSongs.length <= 1) {
            const result = await Playlist.findOneAndDelete(
                { owner: req.user?._id, personalisedSongs: songId }
            );
            await User.findByIdAndUpdate(
                req.user?._id,
                { $pull: { songs: songId, playlists: result._id } }
            );

            return res.status(200).json(new ApiResponse(200, [], "Song and Playlist remove successfully"));
        }
        // Find and update the playlist
        const result = await Playlist.findOneAndUpdate(
            { owner: req.user?._id, personalisedSongs: songId },
            { $pull: { personalisedSongs: songId } }
        );
        console.log("checkPoint1")

        if (!result) {
            return res.status(404).json(new ApiError(404, "Song not found in playlist"));
        }

        // Update the user's songs
        await User.findByIdAndUpdate(
            req.user?._id,
            { $pull: { songs: songId } }
        );
        console.log("checkPoint2")

        return res.status(200).json(new ApiResponse(200, result, "Song removed successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "An error occurred while removing the song"));
    }
});

export const editPlaylistName = AsyncHandler(async (req, res) => {
    const { playlistId, newPlaylistTitle, newcoverImg } = req.body;

    const updateData = {
        playlistTitle: newPlaylistTitle,
    };

    // Conditionally add coverImg if newcoverImg is provided
    if (newcoverImg && newcoverImg.length > 0) {
        updateData.coverImg = newcoverImg;
    }

    const result = await Playlist.findByIdAndUpdate(playlistId, updateData);
if (!result) {
    return res.status(401).json(new ApiError(401, "Title not rename"));
};
return res.status(200).json(new ApiResponse(200, result, "Playlist title renamed successfully"));
});

export const deletePlaylist = AsyncHandler(async (req, res) => {
    const { playlistId } = req.body;
    const result = await Playlist.findByIdAndDelete(playlistId);
    if (!result) {
        return res.status(401).json(new ApiError(401, "Playlist not delete"));
    };
    await User.findByIdAndUpdate(req.user?._id, {
        $pull: { playlists: playlistId, songs: { $in: result.personalisedSongs } },
    });
    return res.status(200).json(new ApiResponse(200, result, "Playlist is deleted successfully"));
});