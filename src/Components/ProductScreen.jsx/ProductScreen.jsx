import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import CategoryProducts from '../Shared/CategoryProducts';
import QuantyControl from '../Shared/QuantyControl';

const ProductScreen = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(useLocation().state);

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        if (!product) {
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
                .then(res => res.data.data.product)
                .then(product => setProduct(product))
                .catch(err => {
                    if (err.response) {
                        setProduct({ title: 'Producto no encontrado' });
                        console.log(err.response.data);
                        console.log(err.response.status);
                    }
                });

            return
        }
    }, []);

    return (
        <section className="ProductScreen">
            <h2 className="ProductScreen__title">{product?.title}</h2>
            <div className="ProductScreen__body">
                <div className="ProductScreen__container-img">
                    {product.productImgs?.map((img, i) => <img key={i} src={img} title={`${product.title} #${i}`} height='300px'/>)}
                </div>
                <p className="ProductScreen__pharagraph">{product.description}</p>
                <div className="ProductScreen__value">
                    <div className="ProductScreen__value__price">
                        <h3 className="ProductScreen__subtitle">Price</h3>
                        <p className="ProductScreen__pharagraph"><strong>${product.price}</strong></p>
                    </div>
                    <div className="ProductScreen__value__quanty">
                        <h3 className="ProductScreen__subtitle">Quanty</h3>
                        <QuantyControl product={product} />
                    </div>
                </div>
            </div>
            <aside className='ProductScreen__aside'>
                {product && <CategoryProducts categoryProductScreen={product.category instanceof Object ? product.category.name : product.category}/>}
            </aside>
        </section>
    )
}

export default ProductScreen