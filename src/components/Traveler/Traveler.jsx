import React, { Component } from 'react'
import UserImgPlaceholder from '../../images/userImgPlaceholder.jpg'
import './Traveler.scss'


export default class Traveler extends Component {
  render() {
    const {user, removeTraveler} = this.props
    let img;
    if(user.profile_pic) {
      img = user.profile_pic
    } else {
      img = UserImgPlaceholder
    }

    return (
      <div className='traveler'>
        <div className='travelerImg' style={{backgroundImage: `url(${img})`}}>
        {/* <i class="fas fa-edit"></i> */}
        <i onClick={()=>removeTraveler(user.bridge_id, user.user_id)} class="fas fa-trash-alt"></i>
        </div>
        <label>{user.user_display_name}</label>
      </div>
    )
  }
}
