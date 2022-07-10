import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ handlerBtnCart }) => {
    return (
        <header className="Header">
            <h1 className="Header__title">
                <NavLink to='/'>Juanes-Store</NavLink>
            </h1>
            <nav className="Header__navbar">
                <ul className="Header__navbar__list">
                    <li className="Header__navbar__item">
                        <NavLink to='/login' className={({isActive}) => isActive ? 'Header__navbar__link--active Header__navbar__link' : 'Header__navbar__link'}>Login</NavLink>
                    </li>
                    <li className="Header__navbar__item">
                        <NavLink to='/purchases' className={({ isActive }) => isActive ? 'Header__navbar__link--active Header__navbar__link' : 'Header__navbar__link'}>Compras</NavLink>
                    </li>
                    <li className="Header__navbar__item" onClick={handlerBtnCart}>
                        Carrito
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header