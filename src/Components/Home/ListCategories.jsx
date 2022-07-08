import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

const ListCategories = () => {
    const categories = useSelector(state => state.categories);

    return (
        <section className="ListCategories">
            <header className="ListCategories__header">
                <h2 className='ListCategories__title'>Categorias</h2>
                <ul className="ListCategories__list">
                    <li
                        className='ListCategories__item'
                    >
                        <NavLink to='/' style={({ isActive }) => isActive ? { fontWeight: 'bold', textDecoration: 'none', color: 'black'} : {textDecoration: 'none', color: 'black'}}>Todos los productos</NavLink>
                    </li>
                    {categories?.map(category => (
                        <li
                            key={category.id}
                            className='ListCategories__item'
                        >
                            <NavLink to={`/category/${category.name.replace(' ', '-')}`} style={({ isActive }) => isActive ? { fontWeight: 'bold', textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }}>{category.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </header>
        </section>
    )
}

export default ListCategories