import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import LandingNav from '../LandingNav/LandingNav';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  login = async () => {
    const { email, password } = this.state;
    const res = await axios.post(`/auth/login`, { email, password })
    if (res.data.loggedIn) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000
      });
      
      Toast.fire({
        type: 'success',
        title: `Welcome back, ${res.data.userData.user_display_name}!`,
      })
      this.props.history.push('/dashboard')
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: res.data.message
      })
    }
  }

  render() {
    return (
      <div className='auth-page'>
        <LandingNav />
        <div className='auth-box'>
          <h2>Login</h2>
          <div>
            Email:
              <input
              placeholder='email'
              type="text"
              onChange={(e) => this.setState({ email: e.target.value })}
              
            />
          </div>
          <div>
            Password:
              <input
              placeholder='password'
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
              className='auth-menu-item'
            />
          </div>
          <Link to='/' className='auth-menu-item'><button>Back</button></Link>
          <button onClick={this.login} className='auth-menu-item'>Login</button>
        </div>
      </div>
    )
  }
}