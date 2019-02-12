import React, { Component } from 'react'
import './Register.scss'
import LandingNav from '../LandingNav/LandingNav';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    confirm: ''
  }
  render() {
    return (
      <>
        <LandingNav auth />
        <div className='register'>
          <div className='registerBox'>
            <h1>Register</h1>
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
            <div>
              Confirm Password:
        <br />
              <input type="password" />
            </div>
            <br />
            <button>Register</button>
          </div>
        </div>
      </>
    )
  }
}
