import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.scss';
import LandingNav from '../LandingNav/LandingNav';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    confirm: '',
    displayName: '',
    bio: '',
  }

  register = async () => {
    const { email, password, confirm, displayName, bio } = this.state;
    if (password !== confirm) {
      swal('Passwords do not match. Please re-enter password')
    } else if (email.length < 1) {
      swal('Please enter your email.')
    } else if (password.length < 1) {
      swal('Please enter a password')
    } else if (confirm.length < 1) {
      swal('Please confirm your password')
    } else {
      const res = await axios.post(`/auth/register`, { email, password, displayName, bio });
      if (res.data.loggedIn) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000
        });
        Toast.fire({
          type: 'success',
          title: `Welcome, ${displayName}!`,
          text: 'You have successfully created an account',
        })
        
        this.props.history.push('/dashboard')
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: res.data.message,
        })
      }
    }
  }

  render() {
    return (
      <div className='auth-register-page'>
        <LandingNav />
        <div className='auth-box'>
          <h2>Register</h2>
          <div>
            Email:
              <input
              type="text"
              placeholder='email'
              onChange={(e) => this.setState({ email: e.target.value })}
              className='auth-menu-item'
            />
          </div>
          <div>
            Password:
              <input
              type="password"
              placeholder='password'
              onChange={(e) => this.setState({ password: e.target.value })}
              className='auth-menu-item'
            />
          </div>
          <div>
            Confirm Password:
              <input
              type="password"
              placeholder='confirm password'
              onChange={(e) => this.setState({ confirm: e.target.value })}
            />
          </div>
          <div>
            Display Name:
              <input
              type="text"
              placeholder='Display Name'
              onChange={(e) => this.setState({ displayName: e.target.value })}
              className='auth-menu-item'
            />
          </div>
          <div>
            Bio:
              <textarea
              type="text"
              placeholder='What do you want people to know about you?'
              onChange={(e) => this.setState({ bio: e.target.value })}
              className='auth-menu-item'
              cols="30" rows="10"
            />
          </div>
          <Link to='/' className='auth-menu-item'><button>Back</button></Link>
          <button onClick={this.register} className='auth-menu-item'>Register</button>
        </div>
      </div>
    )
  }
}
