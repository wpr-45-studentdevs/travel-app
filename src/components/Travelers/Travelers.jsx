import React, { Component } from 'react'
import './Travelers.scss'
import axios from 'axios';
import Traveler from '../Traveler/Traveler';
import { toggle } from '../../Logic/Logic'


export default class Travelers extends Component {

  state = {
    users: [],
    email: '',
    showAdd: false,
  }

  componentDidMount() {
    this.getTravelers()
  }

  getTravelers = async () => {
    const { trip_id } = this.props.trip
    let res = await axios.get(`/api/trips/users/${trip_id}`)
    this.setState({
      users: res.data
    })
  }

  addTraveler = async () => {
    const { trip_id } = this.props.trip
    const { email: user_email } = this.state
    const res = await axios.post(`/api/travelers/${trip_id}`, { user_email })
    if(!res.data.travelerAdded){
      alert(res.data.message)
    } else {
      this.getTravelers()
      this.showAddFn()
      alert(res.data.message)
    }
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

  removeTraveler = async (bridge_id) => {
    await axios.delete(`/api/travelers/${bridge_id}`)
    this.getTravelers()
  }

  render() {
    const { users, showAdd } = this.state
    let usersToDisplay = users.map((user, i) => {
      return (
        <Traveler
          key={i}
          user={user}
          removeTraveler={this.removeTraveler} />
      )
    })
    return (
      <div className='travelers-outer-box'>
        <h2>Travelers:</h2>

        <div className='travelers-container'>
          {usersToDisplay}
        </div>

        {showAdd &&
          <div className='add-container'>
            <input placeholder="Traveler's Email"
            onChange={e => { this.handleChange('email', e.target.value) }} type="text" />
            <i onClick={this.addTraveler} class="fas fa-plus"></i>
            <i onClick={this.showAddFn} class="fas fa-undo"></i>
          </div>
        }
        {
          !showAdd &&
          <div className='add-container'>
            <i onClick={this.showAddFn} class="fas fa-plus"></i>
          </div>
        }

      </div>
    )
  }
}
