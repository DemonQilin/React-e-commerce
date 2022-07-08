import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice';
import loading from './slices/loading.slice';

export default configureStore({
    reducer: {
        products,
        loading
    }
})