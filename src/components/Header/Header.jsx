import React, { Component } from "react"
import "./Header.scss";
import UserMenu from '../Header/UserButton/UserButton';
import Logo from '../../'

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div id="mainHead">
        <img src = {Logo} className='logo'/>
          <h1>Kanoo</h1>
        <div id='headerSpace'></div>
          <div className="userButtons">
            <UserMenu/>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
