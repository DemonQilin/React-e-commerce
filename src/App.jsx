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

function App() {
  const loading = useSelector(state => state.loading);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<CategoryProducts/>}/>
            <Route path='category/:category' element={<CategoryProducts/>}/>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/purchases' element={<ProtectedRoute><div>Compras</div></ProtectedRoute>} />
          <Route path='/product/:id' element={<ProductScreen/>} />
        </Routes>
      </main>
      {loading && <Loader />}
    </div>
  )
}

export default App
