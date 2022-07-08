import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setGlobalProducts: (state, action) => action.payload
    },
});

export const getProducts = () => async dispatch => {
    const products = await axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products').then(res => res.data.data.products);

    dispatch(setGlobalProducts(products))
};

export const { setGlobalProducts } = productsSlice.actions;

export default productsSlice.reducer;