import mongoose, { Schema } from "mongoose";

const albumsSchema = new Schema({
    folderName: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true, 
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
}, {timestamps:true});

export const Album = mongoose.model("Album", albumsSchema);