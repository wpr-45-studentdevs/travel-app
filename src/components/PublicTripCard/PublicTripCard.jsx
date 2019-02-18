import React, { Component } from 'react';
import axios from 'axios';
import './PublicTripCard.scss';
import placeholderImage from '../../images/placeholderImage.jpg';

class TripCard extends Component {

  state = {
    activities: [],
    locations: [],
    budget: [],
    mainPhoto: placeholderImage,
    budgetTotal: 0,
    showDetails: false,
    users: []
  }

  componentDidMount = async () => {
    await this.getInfo();
  }

  handleBackClick() {
    this.setState({
      showDetails: false
    })
  }

  async getInfo() {
    await this.getActivities()
    await this.getLocations()
    await this.getPhotos()
    await this.getBudgetTotal()
    await this.getUsers()
  }

  getActivities = async () => {
    const { trip_id } = this.props.trip
    let res = await axios.get(`/api/activities/${trip_id}`)
    this.setState({
      activities: res.data
    })
  }

  getLocations = async () => {
    const { trip_id } = this.props.trip
    let res = await axios.get(`/api/locations/${trip_id}`)
    this.setState({
      locations: res.data
    })
  }

  getPhotos = async () => {
    const { trip_id } = this.props.trip
    let res = await axios.get(`/api/trip-photos/${trip_id}`);
    console.log(res)
    if (res.data.length === 0) {
      this.setState({
        mainPhoto: placeholderImage
      })
    } else {
      this.setState({
        mainPhoto: res.data[0].photo_url
      })
    }
  }

  getBudgetTotal = async () => {
    const { trip_id } = this.props.trip
    let res = await axios.get(`/api/budget/${trip_id}`)
    await this.setState({
      budget: res.data
    })
    let budgetTotal = this.state.budget.reduce((acc, item) => {
      return acc + item.item_cost / 100
    }, 0)
    this.setState({
      budgetTotal: budgetTotal
    })
  }

  getUsers = async () => {
    const { trip_id } = this.props.trip
    let res = await axios.get(`/api/trips/users/${trip_id}`)
    this.setState({
      users: res.data
    })
  }

  render() {
    const { trip } = this.props;
    const { activities, locations, budget, budgetTotal, mainPhoto, users } = this.state;
    const displayActivities = activities.map((activity, i) => {
      return (
        <li key={i}>{activity.activity_name}</li>
      )
    })

    const locationsToDisplay = locations.map((location, i) => {
      return (
        <li key={location.location_id}>{location.location_name}</li>
      )
    })
    const usersToDisplay = users.map((user, i) => {
      return (
        <div className='user' style={{ backgroundImage: `url(${user.profile_pic})` }}>
          {/* <img src={user.profile_pic} alt=""/> */}
        </div>
      )
    })

    return (
      <div className='publicTripCard'>
        <h3>{trip.trip_name}</h3>
        <p><span>Date:</span>{trip.date}</p>
        <div>
          <img src={mainPhoto} alt="" />
        </div>
        <div className='user-container'>
          {usersToDisplay}
        </div>

        <div className='public-trip-info'>
          <div>
            <h4>Activities:</h4>
            <ul>
              {displayActivities}
            </ul>
          </div>

          <div>
            <h4>Locations:</h4>
            <ul>
              {locationsToDisplay}
            </ul>
          </div>
        </div>

        <div>
          <h4>Budget: ${budgetTotal}</h4>
        </div>


      </div>

    )
  }
}

export default TripCard;