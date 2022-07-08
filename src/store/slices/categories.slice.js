import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: null,
    reducers: {
        setGlobalCategories: (state, action) => action.payload,
    }
});

export const { setGlobalCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;