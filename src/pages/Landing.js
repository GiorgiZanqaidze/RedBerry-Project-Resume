import React from 'react'
import { useNavigate } from 'react-router-dom'
import  Logo  from '../images/RedberryLogo.png'
import  CircleLogo  from '../images/LOGO-40.png'

export const Landing = () => {

  
  const navigate = useNavigate()

  const toFirstPage = () => {
    navigate('/first_page')
  }

  return (
    <div className='landing-page'>
      <header className='header'>
        <img className='logo' src={Logo} alt='logo'/>
      </header>
      <div className='route-resume'>
        <h1 
        className="white-font border-radius font-small bg-black" onClick={toFirstPage}>რეზიუმეს დამატება
          <img src={CircleLogo} alt="circle logo" />
        </h1>
      </div>
    </div>
  )
}