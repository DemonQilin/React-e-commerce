import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import './App.css'
import CategoryProducts from './Components/Home/CategoryProducts'
import Home from './Components/Home/Home'
import Header from './Components/Shared/Header'
import Loader from './Components/Shared/Loader'

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
            {/* <Route path=':category' element={<CategoryProducts/>}/> */}
          </Route>
          <Route path='/login' element={<div>Login</div>} />
          <Route path='/purchases' element={<div>Compras</div>} />
        </Routes>
      </main>
      {loading && <Loader />}
    </div>
  )
}

export default App
