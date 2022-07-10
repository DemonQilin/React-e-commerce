import React from 'react'
import useAddOrUpdateCart from '../hooks/useAddOrUpdateCart';

const QuantyControl = ({ product }) => {
    const { addOrUpdateCart, plusQuantity, minusQuantity, quantity, cartContainsProduct } = useAddOrUpdateCart(product);

    return (
        <>
            {cartContainsProduct && (<div className="QuantyControl__container">
                <button className="QuantyControl__btn" onClick={minusQuantity}>-</button>
                <span className="QuantyControl__span">{quantity}</span>
                <button className="QuantyControl__btn" onClick={plusQuantity}>+</button>
            </div>)}
            <button className="QuantyControl__btn" onClick={addOrUpdateCart}>
                {!cartContainsProduct ? 'Agregar al carrito' : 'Actualizar cantidad'}
            </button>
        </>
    )
}

export default QuantyControl