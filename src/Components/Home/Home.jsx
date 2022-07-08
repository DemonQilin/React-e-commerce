import React from 'react'
import { Outlet } from 'react-router';
import ListCategories from './ListCategories';

const Home = () => {
    return (
        <>
            <aside className="Home__filters">
                <ListCategories/>
            </aside>
            <section className="Home__container-products">
                <Outlet />
            </section>
        </>
    )
}

export default Home