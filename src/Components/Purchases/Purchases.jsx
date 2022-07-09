import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPurchases } from '../../store/slices/purchases.slice';
import PurchaseCard from './PurchaseCard';

const Purchases = () => {
    const purchases = useSelector(store => store.purchases);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!purchases) dispatch(getPurchases());
    }, [])

    return (
        <section className="Purchases">
            <h2 className="Purchases__tite">Mis Compras</h2>
            {!purchases ?
                undefined
                :
                purchases.length ?
                    purchases?.map(purchase => <PurchaseCard key={purchase.id} purchase={purchase} />)
                    :
                    <div className="Purchases__containerEmpty">
                        <p className="Purchases__message">Aún no has comprado ningún producto. Qué estás esperando? </p>
                        <Link to='/'>Ver productos</Link>
                    </div>
            }
        </section>
    )
}

export default Purchases