import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/slices/products.slice';

const SearchProduct = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const [search, setSearch] = React.useState('');
    const [error, setError] = React.useState(false);
    const [focus, setFocus] = React.useState(false);

    const handlerChange = e => {
        setSearch(e.target.value);
        if (!e.target.value) {
            setError('Debes ingresar un producto');
        } else if (!/^[a-z0-9áéíóúü ]+$/i.test(e.target.value)) {
            setError('Solo se permiten letras y números');
        } else {
            setError(false);
        }
    }

    const handlerSubmit = e => {
        e.preventDefault();
        if (!search) {
            setError('Debes ingresar un producto');
            e.target.searchproduct.focus();
        } else {
            setSearch('');
            dispatch(getProducts(categories, 'https://ecommerce-api-react.herokuapp.com/api/v1/products', { name: search }));
        }
    }   

    return (
        <>
            <form className='SearchProduct' onSubmit={handlerSubmit} autoComplete='off'>
                <input
                    type="search"
                    name="searchproduct"
                    className='SearchProduct__input'
                    placeholder='¿Qué estás buscando?'
                    value={search}
                    onChange={handlerChange}
                    onFocus={e => setFocus(true)}
                    onBlur={e => setFocus(false)}
                />
                <button type="submit" className='SearchProduct__submit'>Buscar</button>
            </form>
            {focus && error && <div className='SearchProduct__error'>{error}</div>}
        </>
    )
}

export default SearchProduct