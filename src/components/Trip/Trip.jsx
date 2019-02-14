import React, { Component } from 'react'
import axios from 'axios'
import './Trip.scss'

class Trip extends Component {

  state = {
    activities: [],
    locations: [],
    budget: [],
    mainPhoto: '',
    budgetTotal: 0
  }

  componentDidMount(){
    this.getActivities()
    this.getLocations()
    this.getPhotos()
    this.getBudget()
  }

  getActivities = async () => {
    const {trip_id} = this.props.trip
    let res = await axios.get(`/api/activities/${trip_id}`)
    this.setState({
      activities: res.data
    })
  }

  getLocations = async () => {
    const {trip_id} = this.props.trip
    let res = await axios.get(`/api/locations/${trip_id}`)    
    this.setState({
      locations: res.data
    })
  }

  getPhotos = async () => {
    const {trip_id} = this.props.trip
    let res = await axios.get(`/api/trip-photos/${trip_id}`)
    this.setState({
      mainPhoto: res.data[0].photo_url
    })
  }

  getBudget = async () => {
    const {trip_id} = this.props.trip
    let res = await axios.get(`/api/budget/${trip_id}`)
    await this.setState({
      budget: res.data
    })
    let budgetTotal = this.state.budget.reduce((acc, item) => {
      return acc + item.item_cost / 100
    },0)
    this.setState({
      budgetTotal: budgetTotal
    })
  }

  render() {
    const {trip} = this.props
    const {activities, locations, budgetTotal, mainPhoto} = this.state
    const activitiesToDisplay = activities.map((activity, i) => {
      return (
        <li key={i}>{activity.activity_name}</li>
      )
    })

    const locationsToDisplay = locations.map((location, i) => {
      return (
        <li>{location.location_name}</li>
      )
    })


    return (
      <div  className='tripCard'>
      <div className='mainPhoto'>
        <img src={mainPhoto} alt="mainphoto" />
      </div>
      <h3>{trip.trip_name}</h3>
      <p>Date: {trip.date}</p>
      <div className="listFlex">
        <div>
          <h4>Activities:</h4>
          <ul>
            {activitiesToDisplay}
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
      <h4>Budget: ${budgetTotal}</h4>
    </div>
    //photo will be either main photo chosen-> will need updated table
    // or just random photo/ first photo
    //budget will be calculated total
    )
  }
}

export default Trip