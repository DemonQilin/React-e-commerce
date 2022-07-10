import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart } from '../../store/slices/cart.slice';
import CartProduct from './CartProduct';
import './styles/Cart.css'

const Cart = ({ $btnCart }) => {
    const logged = useSelector(store => store.logged);
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (logged) {
            dispatch(getCart());
        }
    }, [logged]);

    const closeCart = e => {
        $btnCart.current.classList.remove('open');
    }

    return (
        <aside className="Cart" ref={$btnCart}>
            <button className="Cart__btn" onClick={e => dispatch(getCart())}>Actualizar Carrito</button>
            <button className="Cart__btn Cart__btn--close" onClick={closeCart}>X</button>
            <h2 className='Cart__title'>Carrito de compras</h2>
            <section className="Cart__container">
                {
                    !logged ?
                        <>
                            <p className='Cart__paragraph'>Lo sentimos. Debes iniciar sesión para poder visualizar los productos en tu carrito</p>
                            <Link to='/login' onClick={closeCart}>Iniciar Sesión</Link>
                        </>
                        : (!cart || !cart.products.length) ?
                            <>
                                <p className='Cart__paragraph'>!Aún no has agregado ningún producto a tu carrito!</p>
                                <Link to='/' onClick={closeCart}>Ver productos</Link>
                            </>
                            :
                            <ul className="Cart__list">
                                {cart.products.map(product => <CartProduct key={product.id} product={product}/>)}
                            </ul>
                }
            </section>
        </aside>
    )
}

export default Cart