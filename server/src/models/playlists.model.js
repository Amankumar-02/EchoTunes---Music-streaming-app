import mongoose, { Schema } from "mongoose";

const playlistsSchema = new Schema({
    playlistTitle:{
        type:String,
        required:true,
    },
    coverImg:{
        type:String,
        required:true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    personalisedSongs:[
        {
            type: Schema.Types.ObjectId,
            ref:"Song",
        }
    ],
}, {timestamps:true});

export const Playlist = mongoose.model("Playlist", playlistsSchema);