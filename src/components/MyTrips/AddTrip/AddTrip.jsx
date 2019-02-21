import React, { Component } from "react";
import "./AddTrip.scss";
import Axios from "axios";
import {Link} from 'react-router-dom'


export default class AddTrip extends Component {
  state = {
    toggleModal: false,
    tripName: "",
    date: "",
    completed: false,
    public: false,
    tripLength: 0,
    activities: [],
    locations: []
  };

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
    console.log(this.state); 
  };

  addTripDetails = async () => {
    const tripDetails = await Axios.post("/api/add-trip", {
      tripName: this.state.tripName,
      date: this.state.date,
      completed: this.state.completed,
      public: this.state.public,
      tripLength: this.state.tripLength
    }).then(async response => {
      console.log(response.data[0]);
      const tripID = response.data[0].trip_id;
      await Axios.post(`/api/add-user-to-trip/${tripID}`).then(res => {
        console.log(res);
        return res;
      });
    });
  };

  render() {
    return (
      <>
        <button
          className="add-trip-button"
          onClick={() => this.setState({ toggleModal: true })}
        >
          +
        </button>
        {/* MODAL */}
        {this.state.toggleModal === true ? (
          <div className="modalFullPage">
            <div className="modalAddTrip">
              <input
                className="addTripInputs"
                onChange={e => this.handleChange("tripName", e.target.value)}
                type="text"
                placeholder="Trip Name"
              />
              <input
                className="addTripInputs"
                onChange={e => this.handleChange("date", e.target.value)}
                type="text"
                placeholder="Trip Date"
              />
              <input
                className="addTripInputs"
                onChange={e => this.handleChange("tripLength", e.target.value)}
                type="number"
                placeholder="Trip Length"
              />
              <div className="checkboxes">
                <span>Trip Completed?</span>
                <input
                  id="checkboxStyle"
                  type="checkbox"
                  placeholder="trip name"
                  onClick={() =>
                    this.setState({ completed: !this.state.completed })
                  }
                />
              </div>
              <div className="checkboxes">
                <span>Trip Public?</span>
                <input
                  id="checkboxStyle"
                  type="checkbox"
                  placeholder="trip name"
                  onClick={() => this.setState({ public: !this.state.public })}
                />
              </div>
              <div>
                <Link
                  className="Links"
                  to = 'my-trips'
                  onClick={() => {
                    this.addTripDetails();
                    this.setState({ toggleModal: false });
                  }}
                >
                  Save
                </Link>
                <button
                  className="addTripButtons"
                  onClick={() => this.setState({ toggleModal: false })}
                >
                  Close
                </button>
              </div>
              
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
