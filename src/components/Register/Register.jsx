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
    if(password !== confirm) {
      alert('Passwords do not match. Please re-enter password')
    } else if(email.length < 1) {
      alert('Please enter your email.')
    } else if(password.length < 1) {
      alert('Please enter a password')
    } else if(confirm.length < 1) {
      alert('Please confirm your password')
    } else {
      const res = await axios.post(`/auth/register`, { email, password, displayName, bio })
      alert(res.data.message)
      this.props.history.push('/dashboard')
    }
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
              <input 
                type="text"
                placeholder='email'
                onChange={(e) => this.setState({ email: e.target.value})} 
              />
            </div>
            <br />
            <div>
              Password:
        <br />
              <input 
                type="password" 
                placeholder='password'
                onChange={(e) => this.setState({ password: e.target.value})}
              />
            </div>
            <br />
            <div>
              Confirm Password:
        <br />
              <input 
                type="password"
                placeholder='confirm password'
                onChange={(e) => this.setState({ confirm: e.target.value})}
              />
            </div>
            <br />
            <div>
              Display Name:
        <br />
              <input 
                type="text"
                placeholder='Display Name'
                onChange={(e) => this.setState({ displayName: e.target.value})} 
              />
            </div>
            <div>
              Bio:
        <br />
              <input 
                type="text"
                placeholder='What do you want people to know about you?'
                onChange={(e) => this.setState({ bio: e.target.value})} 
              />
            </div>
            <Link to='/'><button>Back</button></Link>
            <button onClick={this.register}>Register</button>
          </div>
        </div>
      </>
    )
  }
}
