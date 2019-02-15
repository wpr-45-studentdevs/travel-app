import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.scss';
import LandingNav from '../LandingNav/LandingNav';

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
      alert('Passwords do not match. Please re-enter password')
    } else if (email.length < 1) {
      alert('Please enter your email.')
    } else if (password.length < 1) {
      alert('Please enter a password')
    } else if (confirm.length < 1) {
      alert('Please confirm your password')
    } else {
      const res = await axios.post(`/auth/register`, { email, password, displayName, bio })
      alert(res.data.message)
      this.props.history.push('/dashboard')
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
              <input
              type="text"
              placeholder='What do you want people to know about you?'
              onChange={(e) => this.setState({ bio: e.target.value })}
              className='auth-menu-item'
            />
          </div>
          <Link to='/' className='auth-menu-item'><button>Back</button></Link>
          <button onClick={this.register} className='auth-menu-item'>Register</button>
        </div>
      </div>
    )
  }
}
