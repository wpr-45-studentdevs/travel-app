import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../SideNav/SideNav.scss";
import AddTrip from './AddTrip/AddTrip'

export default class SideNav extends Component {
  state = {
    toggle: false
  };

  handleToggle() {
    this.setState({ toggle: true });
  }

  render() {
    return (
      <div className="side-navbar">
        <ul>
          <Link onClick={() => this.handleToggle()} to="/dashboard">
            <li>Dashboard</li>
          </Link>
          <AddTrip/>
          <Link onClick={() => this.handleToggle()} to="my-trips">
            <li>My Trips</li>
          </Link>
          <Link onClick={() => this.handleToggle()} to="/bucket-list">
            <li>Bucket List</li>
          </Link>
        </ul>
      </div>
    );
  }
}
