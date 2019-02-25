import React, { Component } from 'react'
import './Travelers.scss'
import axios from 'axios';
import Traveler from '../Traveler/Traveler';
import { toggle } from '../../Logic/Logic'
import Slider from 'react-slick'
import UserImgPlaceholder from '../../images/userImgPlaceholder.jpg'
import {Link} from 'react-router-dom'

export default class Travelers extends Component {

  state = {
    users: [],
    email: '',
    showAdd: false,
    friends: [],
  }

  componentDidMount() {
    this.getTravelers()
    this.getFriends()
  }

  getTravelers = async () => {
    const { trip_id } = this.props.trip
    let res = await axios.get(`/api/trips/users/${trip_id}`)
    this.setState({
      users: res.data
    })
  }

  getFriends = async () => {
    const { user_id, trip_id } = this.props.trip
    const res = await axios.get(`/api/trip/friends/${user_id}/${trip_id}`)
    this.setState({
      friends: res.data
    })
  }

  addTraveler = async (user_id) => {
    const { trip_id } = this.props.trip
    await axios.post(`/api/travelers/${trip_id}/${user_id}`)
    this.getTravelers()
    this.getFriends()
  }

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }

  showAddFn = () => {
    this.setState({
      showAdd: toggle(this.state.showAdd)
    })
  }

  removeTraveler = async (bridge_id, user_id) => {
    const{trip_owner} = this.props.trip
    if(user_id !== trip_owner){
      await axios.delete(`/api/travelers/${bridge_id}`)
      this.getTravelers()
      this.getFriends()
    } else {
      alert('Cannot remove owner from trip.')
    }
  }



  render() {
    const { users, showAdd, friends } = this.state
    let usersToDisplay = users.map((user, i) => {
      return (
        <Traveler
          key={i}
          user={user}
          removeTraveler={this.removeTraveler} />
      )
    })

    const friendsToDisplay = friends.map((friend, i) => {
      let friend_img;
      if (friend.profile_pic) {
        friend_img = friend.profile_pic
      } else {
        friend_img = UserImgPlaceholder
      }
      return (
        <div onClick={() => this.addTraveler(friend.user_id)} key={i} style={{ width: 'fit-content' }}>
          <div className='user-friend' style={{ backgroundImage: `url(${friend_img})` }}><i className="fas fa-plus"></i></div>
          <label htmlFor="">{friend.user_display_name}</label>
        </div>
      )
    })

    let friendLength = 1;
    if (friendsToDisplay.length > 1 && friendsToDisplay.length < 5) {
      friendLength = friendsToDisplay.length
    } else if (friendsToDisplay.length >= 5) {
      friendLength = 5
    }
    let scrollAmount = 1;
    if (friendLength > 1) {
      scrollAmount = friendLength - 1
    }

    console.log(friendsToDisplay.length, friendLength, scrollAmount)

    const settings = {
      dots: false,
      speed: 500,
      infinite: true,
      slidesToShow: friendLength,
      slidesToScroll: scrollAmount
    }

    return (
      <div className='travelers-outer-box'>

        <div>
          <h2>Travelers:</h2>
          <div className='travelers-container'>
            {usersToDisplay}
          </div>
        </div>

        {showAdd &&
          // <div className='add-container'>
          //   <input placeholder="Traveler's Email"
          //   onChange={e => { this.handleChange('email', e.target.value) }} type="text" />
          //   <i onClick={this.addTraveler} className="fas fa-plus"></i>
          //   <i onClick={this.showAddFn} className="fas fa-undo"></i>
          // </div>
          <div className='add-container'>
            {friends[0] ?
              <>
                <p>Friends not yet on this trip</p>
                <Slider {...settings} className='friend-adder-slider'>
                  {friendsToDisplay}
                </Slider>
                <i onClick={this.showAddFn} className="fas fa-undo"></i>
              </>
              :
              <>
                <h4>All of your friends are on this trip</h4>
                <p>Connect with more friends <Link to='/profile'><button><i className="fas fa-user-friends"></i></button></Link></p>
                <i onClick={this.showAddFn} className="fas fa-undo"></i>
              </>
            }
          </div>
        }
        {
          !showAdd &&
          <div className='add-container'>
            {/* <i onClick={this.showAddFn} className="fas fa-plus"></i> */}
            <button className='add-friends-button' onClick={this.showAddFn}>Add friends to your trip</button>
          </div>
        }

      </div>
    )
  }
}
