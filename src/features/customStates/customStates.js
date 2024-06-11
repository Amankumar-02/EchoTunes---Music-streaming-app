import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuToggle: false,
    currentIndex: 0,
    currentSong: null,
    isPlaying: false,
    playIcon: false,
    mediaInfo: "",
    mediaStart: "00:00",
    mediaEnd: "00:00",
    seekBar: 0,
    volumeBar: 100,
    loginStatus: false,
}

export const customStatesSlice = createSlice({
    name: 'customState',
    initialState,
    reducers:{
        setMenuToggle : (state, action)=>{
            state.menuToggle = action.payload;
        },
        setCurrentIndex : (state, action)=>{
            state.currentIndex = action.payload;
        },
        setCurrentSong : (state, action)=>{
            state.currentSong = action.payload;
        },
        setIsPlaying : (state, action)=>{
            state.isPlaying = action.payload;
        },
        setPlayIcon : (state, action)=>{
            state.playIcon = action.payload;
        },
        setMediaInfo : (state, action)=>{
            state.mediaInfo = action.payload;
        },
        setMediaStart : (state, action)=>{
            state.mediaStart = action.payload;
        },
        setMediaEnd : (state, action)=>{
            state.mediaEnd = action.payload;
        },
        setSeekBar : (state, action)=>{
            state.seekBar = action.payload;
        },
        setVolumeBar : (state, action)=>{
            state.volumeBar = action.payload;
        },
        setLoginStatus : (state, action)=>{
            state.loginStatus = action.payload;
        },
    }
})

export const {setMenuToggle, setCurrentIndex, setCurrentSong, setIsPlaying, setPlayIcon, setMediaInfo, setMediaStart, setMediaEnd, setSeekBar, setVolumeBar, setLoginStatus} = customStatesSlice.actions

export default customStatesSlice.reducer