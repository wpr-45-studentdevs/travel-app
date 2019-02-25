import React, { Component } from "react";
import "./AddTrip.scss";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../../styles.scss";
import addTripBackground from "../../../images/add-trips-background.png";

class AddTrip extends Component {
  state = {
    toggleModal: false,
    tripName: "",
    date: "",
    completed: false,
    public: false,
    tripLength: 0,
    image: ""
  };

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  addTripDetails = async () => {
    const { user_id } = this.props.user;
    const res = await Axios.post("/api/add-trip", {
      tripName: this.state.tripName,
      date: this.state.date,
      completed: this.state.completed,
      public: this.state.public,
      tripLength: this.state.tripLength,
      trip_owner: user_id
    });
    console.log(res.data);
    const tripID = res.data[0].trip_id;
    await Axios.post(`/api/add-user-to-trip/${tripID}`);
    await Axios.post(`/api/addPhoto/${tripID}`, {
      photo_url: this.state.image
    });
    // .then(async () => {
    //   const tripID = res.data[0].trip_id;
    //   await Axios.post(`/api/add-user-to-trip/${tripID}`)
    //   (async () => {
    //     await Axios.post(`/api/addPhoto/${tripID}`, {
    //       image: this.state.image
    //     }).then(response => {
    //       return response.data;
    //     });
    //   });
    // });
  };

  render() {
    return (
      <>
        <button
          className="default-button"
          onClick={() => this.setState({ toggleModal: true })}
        >
          Add Trip
        </button>
        {/* MODAL */}
        {this.state.toggleModal === true ? (
          <div className="modalFullPage">
            <div className="modalAddTrip">
              <img src={addTripBackground} className="add-trip-background" />
              <input
                className="default-input"
                style={{ zIndex: 2 }}
                onChange={e => this.handleChange("tripName", e.target.value)}
                type="text"
                placeholder="Trip Name"
              />
              <input
                className="default-input"
                style={{ zIndex: 2 }}
                onChange={e => this.handleChange("date", e.target.value)}
                type="text"
                placeholder="Trip Date"
              />
              <input
                className="default-input"
                style={{ zIndex: 2 }}
                onChange={e => this.handleChange("tripLength", e.target.value)}
                type="number"
                placeholder="Trip Length"
              />
              <input
                className="default-input"
                style={{ zIndex: 2 }}
                onChange={e => this.handleChange("image", e.target.value)}
                type="url"
                placeholder="Image URL"
              />
              <div className="checkboxes">
                <span>Trip Completed?</span>
                <input
                  style={{ zIndex: 2 }}
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
                  style={{ zIndex: 2 }}
                  id="checkboxStyle"
                  type="checkbox"
                  placeholder="trip name"
                  onClick={() => this.setState({ public: !this.state.public })}
                />
              </div>
              <div>
                <button
                  style={{ zIndex: 3 }}
                  className="Links"
                  onClick={() => this.setState({ toggleModal: false })}
                >
                  Close
                </button>
                <button
                  style={{ zIndex: 3 }}
                  className="default-button"
                  onClick={() => {
                    this.addTripDetails();
                    this.setState({ toggleModal: false });
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(AddTrip);
