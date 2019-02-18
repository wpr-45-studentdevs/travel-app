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
    search: null,
  };

  componentDidMount = async () => {
    const res = await axios.get('/auth/userData')
    if (res.data) {
      await this.props.getUserData(res.data)
      await this.getTrips()
    }
    console.log(this.state.trips)
  }


  getTrips = async () => {
    const { user_id } = this.props.user
    let res = await axios.get(`/api/userTrips/${user_id}`)
    await this.setState({
      trips: res.data
    })
  }

  handleSearch = async (userInput) => {
    await this.setState({ search: userInput });
  };


  render() {
    //SEARCH
    const { trips, search } = this.state;
    let filteredTrips = this.state.trips;
    if (search) {
      filteredTrips = trips.filter((trip, index) => {
        for (let property in trip) {
          if (typeof (trip[property]) === 'string') {
            if (trip[property].toLowerCase().includes(search.toLowerCase())) {
              return true
            }
          }
        }
        return false
      })
    }

    let displayTrips = filteredTrips.map((trip) => {
      return (
        <TripCard
          trip={trip}
          key={trip.trip_id}
        />
      )
    });

    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="body">
          <div className="side-nav">
            <SideNav />
          </div>
          <div className='trips-container'>
            <div className='trip-search-list-container'>
              <div>
                <input
                  type="text"
                  placeholder='Search'
                  onChange={(e) => this.handleSearch(e.target.value)}
                />
              </div>
              <div class="trip-card-display">
                {displayTrips}
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