import React, { Component } from "react";
import "./MyTrips.scss";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserData } from '../../ducks/reducer'
import TripCard from "../TripCard/TripCard";

class MyTrips extends Component {
  state = {
    trips: [],
  };

  componentDidMount = async () => {
    const res = await axios.get('/auth/userData')
    if(res.data) {
      await this.props.getUserData(res.data)
      this.getTrips()
    }
  }


  getTrips = async () => {
    const { user_id } = this.props.user
    let res = await axios.get(`/api/userTrips/${user_id}`)
    this.setState({
      trips: res.data
    })
  }


  render() {
    let displayAllTrips = this.state.trips.map((trip) => {
      return (
        <TripCard
          trip={trip}
          key={trip.trip_id}
        />
      );
      
    });
    return (
      <div>
        <Header />
        <div className="body">
          <div className="side-nav">
            <SideNav />
          </div>
          <div className="content">
            <div className="content-window">
              <h1>My Trips</h1>
              <br />
              <div className='trip-display'>
                {displayAllTrips}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps, { getUserData })(MyTrips)