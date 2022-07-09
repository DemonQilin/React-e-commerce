import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({children}) => {
    const logged = useSelector(state => state.logged);

    return (
        <>
            {logged ? children : <Navigate to='/login' state={useLocation()}/>}
        </>
    )
}

export default ProtectedRoute