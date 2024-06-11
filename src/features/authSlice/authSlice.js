import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : [],
    loginStatus : false,

}

export const authSlice = createSlice({
    name: 'customState',
    initialState,
    reducers:{
        setUserData : (state, action)=>{
            state.userData = action.payload;
            state.loginStatus = true;
        },
    }
})

export const {setUserData} = authSlice.actions

export default authSlice.reducer