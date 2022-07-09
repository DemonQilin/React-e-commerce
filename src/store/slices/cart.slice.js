import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfigure from "../../utils/getConfigure";
import { loadingFalse, loadingTrue } from "./loading.slice";

const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/cart';

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
}

export const { setGlobalCart } = cartSlice.actions;

export default cartSlice.reducer;