import React, { Component } from 'react';
import axios from 'axios';
import './PublicTripCard.scss';
import placeholderImage from '../../images/placeholderImage.jpg';
import UserImgPlaceholder from '../../images/userImgPlaceholder.jpg'
import Slider from 'react-slick'
import {calculateTotal} from '../../Logic/Logic'

class PublicTripCard extends Component {

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

  async componentDidUpdate(prevProps) {
    if (prevProps.trip.trip_id !== this.props.trip.trip_id) {
      await this.getInfo();
    }
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
    // let budgetTotal = this.state.budget.reduce((acc, item) => {
    //   return acc + item.item_cost / 100
    // }, 0)
    let budgetTotal = calculateTotal(this.state.budget)
    if(budgetTotal !== '$0'){
      this.setState({
        budgetTotal: budgetTotal
      })
    }
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
      let userImg;
      if (user.profile_pic) {
        userImg = user.profile_pic
      } else {
        userImg = UserImgPlaceholder
      }
      return (
        <div key={i} className='traveler-container' style={{width: 'fit-content'}}>
          <div className='user' style={{ backgroundImage: `url(${userImg})` }}>
            {/* <img src={user.profile_pic} alt=""/> */}
          </div>
          <label htmlFor="">{user.user_display_name}</label>
        </div>
      )
    })

    let friendLength = 1;
    if (usersToDisplay.length > 1 && usersToDisplay.length < 5) {
      friendLength = usersToDisplay.length 
    } else if(usersToDisplay.length >= 5) {
      friendLength = 5
    }
    let scrollAmount = 1;
    if (friendLength > 1) {
      scrollAmount = friendLength - 1
    }

    const settings = {
      dots: false,
      speed: 500,
      infinite: true,
      slidesToShow: friendLength,
      slidesToScroll: scrollAmount
    }


    return (
      <div className='publicTripCard'>
        <div>
          {/* <div className='user-container'>
            {usersToDisplay}
          </div> */}
          <Slider {...settings} className='public-users-slider'>
            {usersToDisplay}
          </Slider>
          <div>
            <div className='public-main-img' style={{ backgroundImage: `url(${mainPhoto})` }} />
          </div>
        </div>


        <div>
          <h3>{trip.trip_name}</h3>
          <p><span>Date:</span>{trip.date}</p>

          {
            displayActivities[0] || locationsToDisplay[0] ?
              <div className='public-trip-info'>
                {
                  displayActivities[0] &&
                  <div className='list-box'>
                    <h4>Activities:</h4>
                    <div className='list'>
                      <ul>
                        {displayActivities}
                      </ul>
                    </div>
                  </div>
                }

                {
                  locationsToDisplay[0] &&
                  <div className='list-box'>
                    <h4>Locations:</h4>
                    <div className='list'>
                      <ul>{locationsToDisplay}</ul>
                    </div>
                  </div>
                }


              </div>
              :
              null
          }

          {
            budgetTotal ?
              <div>
                <h4>Budget: {budgetTotal}</h4>
              </div>
              :
              null
          }
        </div>


      </div>

    )
  }
}

export default PublicTripCard;