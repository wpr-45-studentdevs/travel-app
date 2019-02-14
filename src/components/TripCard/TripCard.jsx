import React, { Component } from 'react';
import axios from 'axios';
import './TripCard.scss';

class TripCard extends Component {

  state = {
    activities: [],
    locations: [],
    budget: [],
    mainPhoto: '',
    budgetTotal: 0,
    showDetails: false,
  }

  componentDidMount = () => {
    this.getInfo();
  }
  
  handleBackClick() {
    this.setState({
      showDetails: false
    })
  }

  getInfo() {
    this.getActivities()
    this.getLocations()
    this.getPhotos()
    this.getBudgetTotal()
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
    let res = await axios.get(`/api/trip-photos/${trip_id}`)
    this.setState({
      mainPhoto: res.data[0].photo_url
    })
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

  render() {
    const { trip } = this.props;
    const { activities, locations, budget, budgetTotal, mainPhoto } = this.state;
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

    return (
      <div className='tripCard'>
        <div onClick={() => this.setState({ showDetails: true })}>
          <div className='mainPhoto'>
            <img src={mainPhoto} alt="mainphoto" />
          </div>
          <h3>{trip.trip_name}</h3>
          <p>Date: {trip.date}</p>
          <div className="listFlex">
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
            <br />
          </div>
          <h4>Budget: </h4>
        </div>

        {/* MODAL */}
        {
          this.state.showDetails === true ?
            <div className='modal-wrapper'>
              <div className='modal'>
                <h2>{trip.trip_name}</h2>
                <h3>{trip.date}</h3>
                <div className='mainPhoto'>
                  <img src={mainPhoto} alt="mainphoto" />
                </div>
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
                <h4>Budget: </h4>
                <button onClick={() => this.setState({ showDetails: false })}>Back</button>
              </div>
            </div>

            : null
        }

      </div>

    )
  }
}

export default TripCard;