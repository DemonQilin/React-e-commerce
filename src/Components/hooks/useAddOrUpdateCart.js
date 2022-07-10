import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { addProductCart, updateProductCart } from "../../store/slices/cart.slice";


const useAddOrUpdateCart = (product) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const logged = useSelector(state => state.logged);
    const cartContainsProduct = cart?.products.find(p => p.id === product.id);
    const [quantity, setQuantity] = useState(cartContainsProduct ? cart.products.find(p => p.id === product.id).productsInCart.quantity : 1);

    useEffect(() => {
        setQuantity(cartContainsProduct ? cart.products.find(p => p.id === product.id).productsInCart.quantity : 1);
    }, [cart]);

    const addOrUpdateCart = e => {
        if (!logged) {
            navigate("/login");
            return;
        }

        if (cartContainsProduct) {
            dispatch(updateProductCart(product.id, quantity));
        } else {
            dispatch(addProductCart(product.id, quantity));
        }
    }

    const plusQuantity = e => setQuantity(quantity + 1);
    const minusQuantity = e => setQuantity(quantity => quantity === 1 ? 1 : quantity - 1);

    return { addOrUpdateCart, plusQuantity, minusQuantity, quantity, cartContainsProduct };
};

export default useAddOrUpdateCart;