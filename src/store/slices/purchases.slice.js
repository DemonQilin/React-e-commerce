import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfigure from "../../utils/getConfigure";
import { loadingFalse, loadingTrue } from "./loading.slice";

const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/purchases';

const purchasesSlice = createSlice({
    name: "purchases",
    initialState: null,
    reducers: {
        setPurchases: (state, action) => action.payload,
    }
});

export const getPurchases = () => async dispatch => {
    dispatch(loadingTrue());
    try {
        const purchases = await axios.get(url, getConfigure()).then(res => res.data.data.purchases);
        dispatch(setPurchases(purchases));
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
        } else {
            console.log('Error', error.message);
        };
        console.log('Review config', error.config);
    } finally {
        dispatch(loadingFalse());
    }
}

export const addPurchase = () => async dispatch => {
    dispatch(loadingTrue());
    const body = {
        street: "Ayacucho 123",
        colony: "Medellin",
        zipCode: 54321,
        city: "Colombia",
        references: "CC La Central"
    };
    try {
        const res = await axios.post(url, body, getConfigure()).then(res => res.data);
        dispatch(getPurchases());
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
        } else {
            console.log('Error', error.message);
        };
        console.log('Review config', error.config);
        dispatch(loadingFalse());
    }
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;