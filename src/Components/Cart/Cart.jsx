import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { getCart } from '../../store/slices/cart.slice';
import CartProduct from './CartProduct';
import './styles/Cart.css'
import { addPurchase } from '../../store/slices/purchases.slice';

const Cart = ({ $btnCart }) => {
    const logged = useSelector(store => store.logged);
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeCart = e => {
        $btnCart.current.classList.remove('open');
    };

    const cbReduce = (total, product) => total + product.productsInCart.quantity * +product.price;

    const purchase = e => {
        if (!logged) {
            closeCart();
            navigate('/login');
            return
        }
        dispatch(addPurchase());
        navigate('/purchases');
    }

    useEffect(() => {
        if (logged) {
            dispatch(getCart());
        }
    }, [logged]);

    return (
        <aside className="Cart" ref={$btnCart}>
            <div className="Cart__container Cart__container--growUp">
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
                                <section className="Cart__section">
                                    {cart.products.map(product => <CartProduct key={product.id} product={product} closeCart={closeCart}/>)}
                                </section>
                    }
                </section>
            </div>
            <section className="Cart__section Cart__section--absolute">
                <div className="Cart__container Cart__container--total">
                    <h2 className="Cart__title">Total</h2>
                    <p className="Cart__paragraph Cart__paragraph--total">$ {(!logged || !cart || !cart.products.length) ? 0 : cart.products.reduce(cbReduce, 0)}</p>
                </div>
                <button className="Cart__btn Cart__btn--Comprar" onClick={purchase}>Comprar</button>
            </section>
        </aside>
    )
}

export default Cart