import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Register/Register.scss';
import LandingNav from '../LandingNav/LandingNav';
import axios from 'axios';

export default class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  login = async () => {
    const { email, password } = this.state;
    const res = await axios.post(`/auth/login`, { email, password })
    if(res.data.loggedIn) {
      console.log(res.data.message)
      this.props.history.push('/dashboard')
    } else {
      console.log(res.data.message)
    }
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
              <input 
                placeholder='email'
                type="text"
                onChange={ (e) => this.setState({ email: e.target.value })}
              />
            </div>
            <br />
            <div>
              Password:
        <br />
              <input
                placeholder='password'
                type="password"
                onChange={ (e) => this.setState({ password: e.target.value })}
              />
            </div>
            <br />
            <Link to='/'><button>Back</button></Link>
            <button onClick={this.login}>Login</button>
          </div>
        </div>
      </>
    )
  }
}
