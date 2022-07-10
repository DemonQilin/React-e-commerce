import React from 'react'

const getMonth = month => {
    switch (month) {
        case 0:
            return 'Enero'
        case 1:
            return 'Febrero'
        case 2:
            return 'Marzo'
        case 3:
            return 'Abril'
        case 4:
            return 'Mayo'
        case 5:
            return 'Junio'
        case 6:
            return 'Julio'
        case 7:
            return 'Agosto'
        case 8:
            return 'Septiembre'
        case 9:
            return 'Octubre'
        case 10:
            return 'Noviembre'
        case 11:
            return 'Diciembre'
        default:
            return 'Error'
    }
};

const PurchaseCard = ({ purchase }) => {
    const date = new Date(purchase.updatedAt);

    return (
        <article className="PurchaseCard">
            <h3 className='PurchaseCard__title'><time dateTime={purchase.updatedAt}>{`${getMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} - ${date.toLocaleTimeString()}`}</time></h3>
            <ul className="PurchaseCard__list">
                {purchase.cart.products.map(product => (
                    <li key={product.id} className='PurchaseCard__item'>
                        <span className='PurchaseCard__item__span PurchaseCard__item__span--name'>{product.title}</span>
                        <span className='PurchaseCard__item__span PurchaseCard__item__span--quantity'> {product.productsInCart.quantity}</span>
                        <span className='PurchaseCard__item__span PurchaseCard__item__span--price'> ${product.productsInCart.quantity * +product.price}</span>
                    </li>
                ))}
            </ul>
        </article>
    )
}

export default PurchaseCard