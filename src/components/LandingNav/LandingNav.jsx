import React from 'react'
import './LandingNav.scss'
import { Link } from 'react-router-dom';
import kanooLogo from '../../images/kanoo_logo3.svg';

export default function LandingNav(props) {
   return (
      <div className='landing-nav-container'>
         <nav className='landing-nav'>
            <div className='landing-nav-item'>
               <Link to='/'>
                  <h1 className='landing-nav-title'>Kanoo</h1>
               </Link>
            </div>
            <div className='landing-nav-item landing-nav-logo-container'>
               <Link to='/'>
                  <img src={kanooLogo} alt="logo" />
               </Link>
            </div>
            <div className='landing-nav-button-container landing-nav-item'>
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
