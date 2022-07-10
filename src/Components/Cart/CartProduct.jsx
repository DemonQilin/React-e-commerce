import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteProductCart, updateProductCart } from '../../store/slices/cart.slice';

const CartProduct = ({ product }) => {
    const [quantity, setQuantity] = useState(product.productsInCart.quantity);
    const dispatch = useDispatch();

    return (
        <article className="CarProduct">
            <button className="CartProduct__btn CartProduct__btn--delete" onClick={e => dispatch(deleteProductCart(product.id))}>Eliminar</button>
            <h3 className="CartProduct__title">{product.title}</h3>
            <h4 className="CartProduct__subtitle">{product.brand}</h4>
            <div className="CartProduct__container">
                <h4 className="CartProduct__subtitle">Cantidad</h4>
                <div className="Cart__container">
                    <button className="CartProduct__btn" onClick={e => setQuantity(quantity => quantity === 1 ? 1 : quantity - 1)}>-</button>
                    <p className="CartProduct__paragraph">{quantity}</p>
                    <button className="CartProduct__btn" onClick={e => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="CartProduct__btn" onClick={e => dispatch(updateProductCart(product.id, quantity))}>Actualizar Cantidad</button>
            </div>
            <div className="CartProduct__container">
                <h4 className="CartProduct__subtitle">Total:</h4>
                <p className="CartProduct__paragraph">$ {product.productsInCart.quantity * +product.price}</p>
            </div>
        </article>
    )
}

export default CartProduct