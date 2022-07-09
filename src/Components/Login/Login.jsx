import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { loadingFalse, loadingTrue } from '../../store/slices/loading.slice';
import { setLogged } from '../../store/slices/logged.slice';

const Login = () => {
    const dispatch = useDispatch();
    const logged = useSelector(state => state.logged);
    const navigate = useNavigate();
    const beforeLocation = useLocation().state ? useLocation().state : '/';
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState({ email: '', password: '' });
    const [focus, setFocus] = useState({ email: false, password: false });

    const validateError = (name, value) => {
        if (name === 'email') {
            if (!value) {
                return 'El correo es requerido'
            }
            if (!/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/i.test(value)) {
                return 'El correo no es valido'
            }
        }

        if (name === 'password') {
            if (!value) {
                return 'La contraseña es requerida'
            }
            if (!/^[a-z0-9]{8,}$/.test(value)) {
                return 'La contraseña debe tener al menos 8 caracteres, y solo letras y numeros'
            }
        }
    };

    const handlerChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        setError({
            ...error,
            [name]: validateError(name, value)
        })
    };

    const handlerFocus = e => {
        const { name } = e.target;
        setFocus({
            ...focus,
            [name]: true
        })
    };

    const handlerBlur = e => {
        const { name } = e.target;
        setFocus({
            ...focus,
            [name]: false
        })
    }

    const handlerSubmit = e => {
        e.preventDefault();

        for (const input in form) {
            setError(error => ({
                ...error,
                [input]: validateError(input, form[input])
            }));
        };

        for(const key in error) {
            if (error[key] || !form[key]) {
                e.target[key].focus();
                return
            }
        };

        dispatch(loadingTrue());
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', form)
            .then(res => res.data.data.token)
            .then(token => {
                localStorage.setItem('token', token);
                dispatch(setLogged(true));
                dispatch(loadingFalse());
                navigate(beforeLocation);
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    setError({
                        password: err.response.data.message,
                    });
                    e.target.password.focus();
                    dispatch(loadingFalse());
                    return
                };

                setError({
                    password: err.response.data.message,
                });
                e.target.password.focus();
                dispatch(loadingFalse());
                return
            })
    }

    return (
        !logged ?
            <div className="Login">
                <div className="Login__body">
                    <h2 className='Login__title'>Iniciar Sesión</h2>
                    <p className='Login__title__paragraph'>Bienvenido! Ingresa tu email y contraseña para continuar</p>
                    <div className="Login__help">
                        <h3 className="Login__title">Usuario Libre</h3>
                        <p className='Login__title__paragraph'>demonqilin@gmail.com</p>
                        <p className='Login__title__paragraph'>12345moon</p>
                    </div>
                    <form className='Login__form' autoComplete='off' onSubmit={handlerSubmit}>
                        <label htmlFor='Login__email'>
                            Email
                            <input type="text" className="Login__input" name='email' id='Login__email' value={form.email} onChange={handlerChange} onFocus={handlerFocus} onBlur={handlerBlur} />
                        </label>
                        {focus.email && error.email && <p className='Login__error'>{error.email}</p>}
                        <br />
                        <label htmlFor='Login__password'>
                            Contraseña
                            <input type={passwordVisible ? 'text' : 'password'} className="Login__input" name='password' id='Login__password' value={form.password} onChange={handlerChange} onFocus={handlerFocus} onBlur={handlerBlur} />
                            <span onClick={e => setPasswordVisible(!passwordVisible)}>👁</span>
                        </label>
                        {focus.password && error.password && <p className='Login__error'>{error.password}</p>}
                        <br />
                        <input type="submit" value="Entrar" />
                    </form>
                </div>
            </div>
            :
            <h2 className='Login__title'>Ya estás loggeado</h2>
    )
}

export default Login