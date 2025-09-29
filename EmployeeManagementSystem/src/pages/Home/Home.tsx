import React from 'react'
import HeroImage from '../../assets/HeroImage.png'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='heroSection'>
      <div>
        <img className='hero' src={HeroImage}/>
      </div>
      <div>
        <h1 className='textHero'>Employee Management System</h1>
        <p className='heroPara'>An Employee Management System (EMS) is a digital platform that helps organizations centralize, manage, and automate human resources tasks and employee data, covering everything from recruitment and onboarding to payroll and performance management. By providing a centralized, secure database and automating repetitive processes, an EMS improves HR efficiency, enhances data accuracy, reduces paperwork, and provides valuable insights to support strategic decision-making. </p>
        <div className='submitBtn'><Link className='submit' to='/employee'  >Add Employee</Link></div>
      </div>
      
      <div>
      </div>
    </div>
  )
}

export default Home
