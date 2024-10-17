import mongoose, { Schema } from "mongoose";

const songsSchema = new Schema({
    media: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    albumId: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
    },
    size: {
        type: String,
        required: true,
    },
}, {timestamps:true});

export const Song = mongoose.model("Song", songsSchema);