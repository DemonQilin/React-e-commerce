import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import './App.css'
import CategoryProducts from './Components/Shared/CategoryProducts'
import Home from './Components/Home/Home'
import ProductScreen from './Components/ProductScreen.jsx/ProductScreen'
import Header from './Components/Shared/Header'
import Loader from './Components/Shared/Loader'
import ProtectedRoute from './Components/Shared/ProtectedRoute'
import Login from './Components/Login/Login'
import Purchases from './Components/Purchases/Purchases'
import { useRef } from 'react'
import Cart from './Components/Cart/Cart'

function App() {
  const loading = useSelector(state => state.loading);
  const $btnCart = useRef();
  const handlerBtnCart = e => {
    $btnCart.current.classList.toggle('open');
  }

  return (
    <div className="App">
      <Header handlerBtnCart={handlerBtnCart} />
      <main>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<CategoryProducts/>}/>
            <Route path='category/:category' element={<CategoryProducts/>}/>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/purchases' element={<ProtectedRoute><Purchases/></ProtectedRoute>} />
          <Route path='/product/:id' element={<ProductScreen/>} />
        </Routes>
        <Cart $btnCart={$btnCart} />
      </main>
      {loading && <Loader />}
    </div>
  )
}

export default App
