import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../SideNav/SideNav.scss";

export default class SideNav extends Component {
  state = {
    toggle: false,
    toggleModal: false
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
          <li
            className="add-trip-button"
            onClick={() => this.setState({ toggleModal: true })}
          >
            Add Trip
          </li>
          <Link onClick={() => this.handleToggle()} to="my-trips">
            <li>My Trips</li>
          </Link>
          <Link onClick={() => this.handleToggle()} to="/bucket-list">
            <li>Bucket List</li>
          </Link>
        </ul>
        {/* MODAL */}
        {this.state.toggleModal === true ? (
          <div className="modalWrapper">
            <div className="modal">
              <input placeholder="trip name" />
              <input placeholder="Trip Date" />
              <input placeholder="Trip Length" />
              <div className = 'checkboxes'>
                 <span>Trip Completed?</span>
                 <input type="checkbox" placeholder="trip name" />
              </div>
              <div className = 'checkboxes'>
                 <span>Trip Public?</span>
                 <input type="checkbox" placeholder="trip name" />
              </div>
              <button>Save</button>
              <button onClick={()=>this.setState({toggleModal: false})}>Close</button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
