import React, { Component } from "react";
import "./AddTrip.scss";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../../styles.scss";
import addTripBackground from "../../../images/add-trips-background.png";
import placeholder from '../../../images/placeholderImage.jpg'
import Swal from 'sweetalert'

class AddTrip extends Component {
  state = {
    toggleModal: false,
    tripName: "",
    date: "",
    completed: false,
    public: false,
    // tripLength: 0,
    image: placeholder
  };

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  addTripDetails = async () => {
    const { user_id } = this.props.user;
    const {tripName, date} = this.state;
    if(tripName && date){
      const res = await Axios.post("/api/add-trip", {
        tripName: this.state.tripName,
        date: this.state.date,
        completed: this.state.completed,
        public: this.state.public,
        // tripLength: this.state.tripLength,
        trip_owner: user_id
      });
      console.log(res.data);
      const tripID = res.data[0].trip_id;
      await Axios.post(`/api/add-user-to-trip/${tripID}`);
      await Axios.post(`/api/addPhoto/${tripID}`, {
        photo_url: this.state.image
      });
      this.handleReset()
    } else {
      Swal('Please enter a name and date for your trip')
    }
  };

  handleReset = () => {
    this.setState({
      toggleModal: false,
      tripName: "",
      date: "",
      completed: false,
      public: false,
      image: placeholder
    })
  }

  render() {
    return (
      <>
        <div className='buttonBack'>
          <button
            className="default-button add-trip-button"
            onClick={() => this.setState({ toggleModal: true })}
          >
            Add Trip
          </button>
        </div>
        {/* MODAL */}
        {this.state.toggleModal === true ? (
          <div className="modalFullPage">
            <div className="modalAddTrip">
              <img src={addTripBackground} className="add-trip-background" />
              <input
                className="default-input add-trip-input"
                style={{ zIndex: 2, color: "dark gray" }}
                onChange={e => this.handleChange("tripName", e.target.value)}
                type="text"
                placeholder="Trip Name"
              />
              <input
                className="default-input add-trip-input"
                style={{ zIndex: 2, color: "dark gray" }}
                onChange={e => this.handleChange("date", e.target.value)}
                type="text"
                placeholder="Trip Date"
              />
              {/* <input
                className="default-input"
                style={{ zIndex: 2, color: "dark gray" }}
                onChange={e => this.handleChange("tripLength", e.target.value)}
                type="number"
                placeholder="Trip Length"
              /> */}
              <input
                className="default-input add-trip-input"
                style={{ zIndex: 2, color: "dark gray" }}
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
