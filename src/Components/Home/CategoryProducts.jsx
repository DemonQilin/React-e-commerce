import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router'
import { getProducts, setGlobalProducts } from '../../store/slices/products.slice';
import ProductCard from './ProductCard'

const CategoryProducts = () => {
    const category = useParams().category?.replace('-', ' ');
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);
    const location = useLocation();
    

    useEffect(() => {
        if (!categories?.some(el => el.name === category) && category) {
            dispatch(setGlobalProducts([]));
            return
        }

        if (category) {
            dispatch(getProducts(categories, 'https://ecommerce-api-react.herokuapp.com/api/v1/products', { category }));
        } else {
            dispatch(getProducts(categories, 'https://ecommerce-api-react.herokuapp.com/api/v1/products'));
        }
    }, [location]);

    return (products.length
        ? <>
            <h2>Productos</h2>
            {products?.map(product => <ProductCard key={product.id} product={product} />)}
        </>
        : <h2>Lo sentimos. No existen productos para la categoria "{category}"</h2>
    )
}

export default CategoryProducts