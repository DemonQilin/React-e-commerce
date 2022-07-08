import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        loadingTrue: state => true,
        loadingFalse: state => false
    }
});

export const { loadingTrue, loadingFalse } = loadingSlice.actions;

export default loadingSlice.reducer;