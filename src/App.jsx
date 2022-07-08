import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import './App.css'
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
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<div>Login</div>} />
        </Routes>
      </main>
      {loading && <Loader />}
    </div>
  )
}

export default App
