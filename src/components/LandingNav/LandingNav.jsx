import React from 'react'
import './LandingNav.scss'
import { Link } from 'react-router-dom';

export default function LandingNav(props) {
   return (
      <div className='landing-nav-container'>
         <nav className='landing-nav'>
            <h1 className='landing-nav-title'>Kanoo</h1>
            {props.auth ?
               <> </>
               :
               <>
                  <div>
                     <Link to='/login' className='landing-nav-buttons'>
                        Login
                     </Link>
                     <Link to='/register' className='landing-nav-buttons'>
                        Register
                     </Link>
                  </div>
               </>}
         </nav>
      </div>
   )
}
