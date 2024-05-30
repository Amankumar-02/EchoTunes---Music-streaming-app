import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs: [],
    albums: [],
    albumSongs: [],
    playerSongs: [],
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers:{
        setSongs : (state, action)=>{
            state.songs = action.payload;
        },
        setAlbums : (state, action)=>{
            state.albums = action.payload;
        },
        setAlbumSongs : (state, action)=>{
            state.albumSongs = action.payload;
        },
        setPlayerSongs : (state, action)=>{
            state.playerSongs = action.payload;
        },
    }
})

export const {setSongs, setAlbums, setAlbumSongs, setPlayerSongs} = testSlice.actions

export default testSlice.reducer