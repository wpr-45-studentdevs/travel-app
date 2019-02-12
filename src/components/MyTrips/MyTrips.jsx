import React, { Component } from 'react'
import './MyTrips.scss'

export default class MyTrips extends Component {

  state = {
    trips: [
      {
        photos: ['https://d3hne3c382ip58.cloudfront.net/resized/750x420/4-days-3-nights-amazing-tanzania-safari-experience-tour-2-31090_1510029029.JPG'],
        title: 'Southern Africa',
        activities: ['safari', 'get chased by a cheetah', 'blessed the reigns'],
        locations: ['tanzania', 'zimbabwe'],
        dates: '5/20/19 - 6/3/19',
        budget: '$3000'

      },

      {
        photos: ['https://www.barcelo.com/pinandtravel/wp-content/uploads/2018/04/Apertura1-3-1170x532.jpg'],
        title: 'Mexico',
        activities: ['swim in a cenote', 'experience a strong undertow'],
        locations: ['yacatan peninsula', 'chichen itza'],
        dates: '6/20/19 - 7/3/19',
        budget: '$1000'
      }
    ]
  }
  render() {
    let tripToDisplay = this.state.trips.map((trip, i) => {
      let activities = trip.activities.map((activity, i) => {
        return (
          <li key={i}>{activity}</li>
        )
      })
      let locations = trip.locations.map((location, i) => {
        return (
          <li key={i}>{location}</li>
        )
      })
      return (
        <div key={i} className='tripCard'>
          <div className='mainPhoto'>
          <img src={trip.photos[0]} alt="mainphoto" />
          </div>
          <h3>{trip.title}</h3>
          <div className='listFlex'>
            <div>
              <h4>Activities:</h4>
              <ul>
                {activities}
              </ul>
            </div>
            <div>
              <h4>Locations:</h4>
              <ul>
                {locations}
              </ul>
            </div>
            <br />
          </div>
          <h4>Budget: {trip.budget}</h4>

        </div>
        //photo will be either main photo chosen-> will need updated table
        // or just random photo/ first photo
        //budget will be calculated total
      )
    })
    return (
      <div>
        <h1>My Trips</h1>
        <br />
        <div className='tripDisplay'>
          {tripToDisplay}
        </div>
      </div>
    )
  }
}
