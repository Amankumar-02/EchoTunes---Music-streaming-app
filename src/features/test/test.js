import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs: [],
    albums: [],
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
        }
    }
})

export const {setSongs, setAlbums} = testSlice.actions

export default testSlice.reducer