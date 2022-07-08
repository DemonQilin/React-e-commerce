import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { setGlobalCategories } from "./categories.slice";
import { loadingFalse, loadingTrue } from "./loading.slice";

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setGlobalProducts: (state, action) => action.payload
    },
});

export const getProducts = (categoriesState, url, filter = null) => async dispatch => {
    dispatch(loadingTrue());

    if (!categoriesState) {
        const categories = await axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/').then(res => res.data.data.categories);

        dispatch(setGlobalCategories(categories));
    }

    const products = await axios.get(url)
        .then(res => res.data.data.products)
        .then(
            products => filter === null
                ? products
                : filter.hasOwnProperty('category')
                    ? products.filter(product => product.category.name === filter.category)
                    : filter.hasOwnProperty('name')
                        ? products.filter(product => new RegExp(filter.name, 'ig').test(product.title))
                        : null
        );

    dispatch(setGlobalProducts(products));
    dispatch(loadingFalse());
};

export const { setGlobalProducts } = productsSlice.actions;

export default productsSlice.reducer;