import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteProductCart } from '../../store/slices/cart.slice';
import useAddOrUpdateCart from '../hooks/useAddOrUpdateCart';

const CartProduct = ({ product }) => {
    const dispatch = useDispatch();
    const { addOrUpdateCart, plusQuantity, minusQuantity, quantity } = useAddOrUpdateCart(product);

    return (
        <article className="CarProduct">
            <button className="CartProduct__btn CartProduct__btn--delete" onClick={e => dispatch(deleteProductCart(product.id))}>Eliminar</button>
            <h3 className="CartProduct__title">{product.title}</h3>
            <h4 className="CartProduct__subtitle">{product.brand}</h4>
            <div className="CartProduct__container">
                <h4 className="CartProduct__subtitle">Cantidad</h4>
                <div className="Cart__container">
                    <button className="CartProduct__btn" onClick={minusQuantity}>-</button>
                    <span className="CartProduct__span">{quantity}</span>
                    <button className="CartProduct__btn" onClick={plusQuantity}>+</button>
                </div>
                <button className="CartProduct__btn" onClick={addOrUpdateCart}>Actualizar Cantidad</button>
            </div>
            <div className="CartProduct__container">
                <h4 className="CartProduct__subtitle">Total:</h4>
                <p className="CartProduct__paragraph">$ {product.productsInCart.quantity * +product.price}</p>
            </div>
        </article>
    )
}

export default CartProduct