import React from 'react'
import './LandingNav.scss'
import { Link } from 'react-router-dom';

export default function LandingNav(props) {
   return (
      <>
         <nav className='landing-nav'>
            <h1 className='landing-nav-title'>Kanoo</h1>
            {props.auth ?
               <> </>
               :
               <>
                  <div>
                     <Link to='/login'>
                        <button>Login</button>
                     </Link>
                     <Link to='/register'>
                        <button>Register</button>
                     </Link>
                  </div>
               </>}

         </nav>
      </>
   )
}
