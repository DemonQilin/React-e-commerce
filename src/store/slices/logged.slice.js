import { createSlice } from "@reduxjs/toolkit";

const loggedSlice = createSlice({
    name: "logged",
    initialState: false,
    reducers: {
        setLogged: (state, action) => action.payload,
    }
});

export const { setLogged } = loggedSlice.actions;

export default loggedSlice.reducer;