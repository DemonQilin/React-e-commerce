import React from 'react'
import { useNavigate } from 'react-router'
import QuantyControl from '../Shared/QuantyControl';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const navigateToProduct = e => {
        navigate(`/product/${product.id}`, { state: product });
    };

    return (
        <article className="Home__product">
            <h3 onClick={navigateToProduct}>{product.title}</h3>
            <div className="Product__container-img">
                {product.productImgs?.map((img, i) => <img key={i} src={img} title={`${product.title} #${i}`} height='100px' />)}
            </div>
            <div className="Product__body">
                <h4>Price</h4>
                <p>{product.price}</p>
            </div>
            <QuantyControl product={product} />
        </article>
    )
}

export default ProductCard