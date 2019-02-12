import React, { Component } from 'react'
import '../Register/Register.scss'
import LandingNav from '../LandingNav/LandingNav';

export default class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <>
        <LandingNav auth />
        <div className='register'>
          <div className='registerBox'>
            <h1>Login</h1>
            <div>
              Email:
        <br />
              <input placeholder='email' type="text" />
            </div>
            <br />
            <div>
              Password:
        <br />
              <input placeholder='password' type="password" />
            </div>
            <br />
            <button>Login</button>
          </div>
        </div>
      </>
    )
  }
}
