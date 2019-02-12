import React, { Component } from "react"
import "./Header.scss";
import SimpleMenu from './UserButton'

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div id="mainHead">
          <h1>Kanoo</h1>
        <div id='headerSpace'></div>
          <div className="userButtons">
            <SimpleMenu/>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
