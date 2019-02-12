import React, { Component } from 'react'
import './Register.scss'

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    confirm: ''
  }
   render() {
      return (
        <div className='register'>
        <div className='registerBox'>
        <h1>Register</h1>
        <div>
        Email:
        <br/>
        <input placeholder='email' type="text"/>
        </div>
        <br/>
        <div>
        Password:
        <br/>
        <input placeholder='password' type="password"/>
        </div>
        <br/>
        <div>
        Confirm Password:
        <br/>
        <input type="password"/>
        </div>
        <br/>
        <button>Register</button>
        </div>
     </div>
      )
   }
}
