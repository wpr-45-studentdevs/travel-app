import React from 'react'
import './LandingNav.scss'
import { Link } from 'react-router-dom';
import Logo from '../../images/kanoo_logo3.svg'

export default function LandingNav(props) {
   return (
      <div className='landing-nav-container'>
         <nav className='landing-nav'>
            <h1 className='landing-nav-title'>Kanoo</h1>
            <img src={Logo} alt="logo"/>
               <div>
                  <Link to='/login' className='landing-nav-login-button'>
                     Login
                  </Link>
                  <Link to='/register' className='landing-nav-register-button'>
                     Register
                  </Link>
               </div>
         </nav>
      </div>
   )
}
