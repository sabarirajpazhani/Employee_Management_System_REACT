
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { FaHatCowboy } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
        <nav className='navbarMain'>
        <nav className='navbarHeader'>
            <FaHatCowboy style={{}} className='logo'/>
            <h2 className='brand'>Employee Management System</h2>
        </nav>
            <div className='navItems'>
                <NavLink to={'/'} id='nav1' className={({isActive})=>(isActive ? "active" : "")}>
                    Home
                </NavLink>

                <NavLink to={'/about'} id='nav2' className={({isActive})=>(isActive ? "active" : "")}>
                    About
                </NavLink>

                <NavLink to={'/employee'} id='nav3' className={({isActive})=>(isActive ? "active" : "")}>
                    Employees
                </NavLink>
            </div>
        </nav>
    </>
  )
}

export default Navbar
