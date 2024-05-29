import {configureStore} from '@reduxjs/toolkit';
import testSlice from '../features/test/test';

export const store = configureStore({
    reducer: {
        test: testSlice,
    }
})