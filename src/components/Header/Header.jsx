import React, { Component } from "react";
import "./Header.scss";

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div id="mainHead">
          <h1>Kanoo</h1>
        <div id='headerSpace'></div>
          <div className="userButtons">
            <h3 id="dropdown">Profile</h3>
            <h3 id="dropdown">Logout</h3>
            <h3 id="dropdown">username</h3>
            <h3 id="dropdown">dropdown</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
