import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

export const testSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        storeCartData : (state, action)=>{
            const newCart = [action.payload, ...state.cart];
            state.cart = newCart;
        },
    }
})

export const {storeCartData} = testSlice.actions

export default testSlice.reducer