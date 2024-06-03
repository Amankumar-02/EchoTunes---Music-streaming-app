import mongoose, { Schema } from "mongoose";

const songsSchema = new Schema({
    media: {
        type: String,
        required: true,
        // unique: true,
    },
    img: {
        type: String,
        required: true,
        // unique: true,
    },
    title: {
        type: String,
        required: true,
        // unique: true,
    },
    desc: {
        type: String,
        required: true,
        // unique: true,
    },
    albumId: {
        type: Schema.Types.ObjectId,
        ref: "Album"
    },
    size: {
        type: String,
        required: true,
        // unique: true,
    },
}, {timestamps:true});

export const Song = mongoose.model("song", songsSchema);