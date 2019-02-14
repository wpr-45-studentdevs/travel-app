import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import Header from '../Header/Header';
import './TripDetails.scss';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import axios from 'axios';

class TripDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         tripName: '',
         date: '',
         completed: '',
      }
   }

   componentDidMount = async () => {
      const { trip_name, date, completed } = this.props.tripInfo;
      const res = await axios.post('/api/tripInfo', { trip_name, date, completed });
      console.log(res.data)
      await this.setState({
         tripName: res.data.tripInfo.trip_name,
         date: res.data.tripInfo.date,
         completed: res.data.tripInfo.completed,
      })
      console.log(this.state)
   }

   render() {
      const { tripInfo, tripDetails } = this.props;
      let displayActivities;
      let locations;
      let budget;
      if(tripDetails.activities) {
         displayActivities = tripDetails.activities.map(activity => {
            return <li key={ activity.activity_id }>{activity.activity_name}</li>
         })
      }
      if(tripDetails.locations) {
         locations = tripDetails.locations.map(location => {
            return <li key={location.location_id}>{location.location_name}</li>
         })
      }
      if(tripDetails.budget) {
         budget = tripDetails.budget.map( item => {
            return (
               <li>{item.item_name}: ${item.item_cost/100}</li>
            )
         })
      }
      
      return (
         <div>
            <div className='header'>
            <Header/>
            </div>
            <div className='body'>
               <div className='side-nav'>
                  < SideNav />
               </div>
               <div className='content'>
                  <div className='content-window'>
                     <h2>Trip Details</h2>
                     <h3>{tripInfo.trip_name}</h3>
                     <p>Date: {tripInfo.date}</p>
                     <div className='activities-list'>
                        <h3>Activities:</h3>
                        {displayActivities}
                     </div>
                     <div className='locations-list'>
                        <h3>Locations:</h3>
                        {locations}
                     </div>
                     <div>
                        <h3>Budget:</h3>
                        {budget}
                        <p>total: ${tripDetails.budgetTotal}</p>
                     </div>

                     <Link to='/my-trips'>
                        <button>Back to My Trips</button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(TripDetails);