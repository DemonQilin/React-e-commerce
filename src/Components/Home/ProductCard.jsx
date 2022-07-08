import React from 'react'
import { useNavigate } from 'react-router'

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const navigateToProduct = e => {
        navigate(`/product/${product.id}`, { state: product })
    }

    return (
        <artticle className="Home__product">
            <h3 onClick={navigateToProduct}>{product.title}</h3>
            <div className="Product__body">
                <h4>Price</h4>
                <p>{product.price}</p>
            </div>
        </artticle>
    )
}

export default ProductCard