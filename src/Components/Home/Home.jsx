import React from 'react'
import { Outlet } from 'react-router';
import ListCategories from './ListCategories';
import SearchProduct from './SearchProduct';

const Home = () => {
    return (
        <>  
            <aside className="Home__filters">
                <ListCategories/>
            </aside>
            <aside className='Home__search-form'>
                <SearchProduct/>
            </aside>
            <section className="Home__container-products">
                <Outlet />
            </section>
        </>
    )
}

export default Home