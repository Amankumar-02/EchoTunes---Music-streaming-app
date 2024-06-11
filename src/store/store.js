import {configureStore} from '@reduxjs/toolkit';
import testSlice from '../features/test/test';
import customStatesSlice from '../features/customStates/customStates';
import authSlice from '../features/authSlice/authSlice';

export const store = configureStore({
    reducer: {
        test: testSlice,
        customState: customStatesSlice,
        auth: authSlice,
    }
})