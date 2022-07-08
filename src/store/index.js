import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice';
import loading from './slices/loading.slice';
import categories from './slices/categories.slice';

export default configureStore({
    reducer: {
        products,
        loading,
        categories
    }
})