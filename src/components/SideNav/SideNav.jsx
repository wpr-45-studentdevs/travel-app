import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../SideNav/SideNav.scss";

export default class SideNav extends Component {
  state = {
    toggle: false
  };

  handleToggle(){
     this.setState({toggle: true})
  }

  
  render() {
    return (
      <div className="side-navbar">
        <ul>
          <Link onClick={()=>this.handleToggle()} to="/dashboard">Dashboard</Link>
          <li className="add-trip-button">Add Trip</li>
          <Link onClick={()=>this.handleToggle()} to="my-trips">
            <li>My Trips</li>
          </Link>
          <Link onClick={()=>this.handleToggle()} to="/bucket-list">
            <li>Bucket List</li>
          </Link>
        </ul>
      </div>
    );
  }
}
