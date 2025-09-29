
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Employee from './pages/Employees/Employee'
import NotFound from './pages/NotFound/NotFound'
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/employee' element={<Employee/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App
