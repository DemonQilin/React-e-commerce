import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfigure from "../../utils/getConfigure";
import { loadingFalse, loadingTrue } from "./loading.slice";

const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/cart';
const managmentError = error => {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
    } else {
        console.log('Error', error.message);
    }
    console.log('Review config', error.config);
    dispatch(loadingFalse());
};

const cartSlice = createSlice({
    name: "cart",
    initialState: null,
    reducers: {
        setGlobalCart: (state, action) => action.payload,
    }
});

export const getCart = () => async dispatch => {
    dispatch(loadingTrue());
    try {
        const cart = await axios.get(url, getConfigure()).then(res => res.data.data.cart);
        dispatch(setGlobalCart(cart));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 && error.response.data.message === "Cart not found") {
                return dispatch(setGlobalCart(null));
            } else {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        } else {
            console.log('Error', error.message);
        };
        console.log('Review config', error.config);
    } finally { dispatch(loadingFalse()) }
};

export const addProductCart = (id, quantity) => async dispatch => {
    dispatch(loadingTrue());
    try {
        const res = await axios.post(url, { id, quantity }, getConfigure()).then(res => res.data.status);

        if (res === "success") dispatch(getCart());
    } catch (error) {
        managmentError(error);
    }
};

export const updateProductCart = (id, newQuantity) => async dispatch => {
    dispatch(loadingTrue());
    try {
        const res = await axios.patch(url, { id, newQuantity }, getConfigure());

        if (res.status === 204) dispatch(getCart());
    } catch (error) {
        managmentError(error);
    }
};

export const deleteProductCart = id => async dispatch => {
    dispatch(loadingTrue());
    try {
        const res = await axios.delete(`${url}/${id}`, getConfigure());
        if (res.status === 204) dispatch(getCart());
    } catch (error) {
        managmentError(error);
    }
};

export const { setGlobalCart } = cartSlice.actions;

export default cartSlice.reducer;