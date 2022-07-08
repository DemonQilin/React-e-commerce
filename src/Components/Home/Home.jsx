import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/slices/products.slice';
import ProductCard from './ProductCard';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    },[])

    return (
        <>
            <aside className="Home__filters"></aside>
            <section className="Home__container-products">
                {products?.map(product => <ProductCard key={product.id} product={product}/>)}
            </section>
        </>
    )
}

export default Home