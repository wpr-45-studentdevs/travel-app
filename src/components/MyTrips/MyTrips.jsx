import React, { Component } from "react";
import "./MyTrips.scss";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserData } from '../../ducks/reducer'
import TripCard from "../TripCard/TripCard";
import Switch from '@material-ui/core/Switch';
import { toggle } from '../../Logic/Logic'


class MyTrips extends Component {
  state = {
    trips: [],
    search: null,
    showCompleted: false
  };

  componentDidMount = async () => {
    const res = await axios.get('/auth/userData')
    if (res.data) {
      if (!this.s)
        await this.props.getUserData(res.data)
      await this.getTrips()
    }
  }


  getTrips = async () => {
    const { user_id } = this.props.user
    const { showCompleted } = this.state
    if (!showCompleted) {
      const res = await axios.get(`/api/userTrips/${user_id}`)
      await this.setState({
        trips: res.data
      })
    } else {
      const res = await axios.get(`/api/trips/completed/${user_id}`)
      await this.setState({
        trips: res.data
      })
    }
  }

  handleSearch = async (userInput) => {
    await this.setState({ search: userInput });
  };

  handleChange = async () => {
    await this.setState({
      showCompleted: toggle(this.state.showCompleted)
    })
    await this.getTrips()
  }

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
                  className='default-input'
                  onChange={(e) => this.handleSearch(e.target.value)}
                />
                <div className='my-trips-toggle'>
                  <Switch
                    checked={this.state.checkedB}
                    onChange={this.handleChange}
                    value="checkedB"
                    color="primary"
                  />
                  <label>Show Completed Trips</label>
                </div>
              </div>
              <div className="trip-card-display">
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