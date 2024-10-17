import {configureStore} from '@reduxjs/toolkit';
import testSlice from '../features/test/test';
import customStatesSlice from '../features/customStates/customStates';

export const store = configureStore({
    reducer: {
        test: testSlice,
        customState: customStatesSlice,
    }
})