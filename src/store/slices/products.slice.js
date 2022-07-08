import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loadingFalse, loadingTrue } from "./loading.slice";

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setGlobalProducts: (state, action) => action.payload
    },
});

export const getProducts = () => async dispatch => {
    dispatch(loadingTrue());

    const products = await axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products').then(res => res.data.data.products);

    dispatch(setGlobalProducts(products));
    dispatch(loadingFalse());
};

export const { setGlobalProducts } = productsSlice.actions;

export default productsSlice.reducer;