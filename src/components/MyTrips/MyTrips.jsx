import React, { Component } from "react";
import "./MyTrips.scss";
import SideNav from "../SideNav/SideNav";
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import TripCard from "../TripCard/TripCard";
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core';
import { toggle } from '../../Logic/Logic';
import AddTrip from '../MyTrips/AddTrip/AddTrip';

const styles = theme => ({
  colorSwitchBase: {
    color: 'teal',
    '&$colorChecked': {
      color: 'teal',
      '& + $colorBar': {
        backgroundColor: 'teal',
      },
    },
  },
  colorBar: {},
  colorChecked: {},
});



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
          getTrips={this.getTrips}
        />
      )
    });

    const { classes } = this.props;


    return (
      <div className="body">
        <div className="side-nav">
          <SideNav />
        </div>
        <div className='trips-container'>
          <div className='trip-header-list-container'>
            <div className='header-item-container'>
              <div>
                <input
                  type="text"
                  placeholder='Search'
                  className='default-input'
                  onChange={(e) => this.handleSearch(e.target.value)}
                />
              </div>
              <div>
                < AddTrip />
              </div>
              <div className='my-trips-toggle'>
                <label>Upcoming</label>
                <Switch
                  checked={this.state.checkedB}
                  onChange={this.handleChange}
                  value="checkedB"
                  color="primary"
                  label='Show Completed Trips'
                  className='switch'
                  classes={{
                    switchBase: classes.colorSwitchBase,
                    checked: classes.colorChecked,
                    bar: classes.colorBar,
                  }}
                />
                <label>Completed</label>
              </div>
            </div>
            <div className="trip-card-display">
              {displayTrips}
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

export default connect(mapStateToProps, { getUserData })(withStyles(styles)(MyTrips))