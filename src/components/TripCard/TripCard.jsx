import React, { Component } from 'react';
import axios from 'axios';
import './TripCard.scss';
import placeholderImage from '../../images/placeholderImage.jpg';
import Budget from '../Budget/Budget';
import TextEditor from '../TextEditor/TextEditor';

class TripCard extends Component {

  state = {
    activities: [],
    locations: [],
    budget: [],
    mainPhoto: placeholderImage,
    budgetTotal: 0,
    showDetails: false,
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


  render() {
    const { trip } = this.props;
    const { activities, locations, mainPhoto } = this.state;
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
        <div onClick={() => this.setState({ showDetails: true })} className='trip-details-body'>
          <div className='trip-name-date'>
            <h3>{trip.trip_name}</h3>
            <p>{trip.date}</p>
          </div>
          <div className='card-image-container' style={{
            backgroundImage: `url(${mainPhoto})`
          }}>

          </div>
        </div>

        {/* MODAL */}
        {
          this.state.showDetails === true ?
            <div className='trip-modal-wrapper'>
              <div className='trip-modal'>
                <div className='detail-box'>
                  < Budget
                      key={trip.trip_id}
                      trip_id={trip.trip_id}
                  />
                </div>
                <div className='detail-box'>

                </div>
                <div className='detail-box'>

                </div>
                <div className='detail-box'>

                </div>
                <div className="text-editor-box">
                    < TextEditor
                        trip_id={trip.trip_id}
                    />
                </div>
                <button onClick={() => this.setState({ showDetails: false })} className='trip-modal-close-button'>Back</button>
              </div>
            </div>

            : null
        }

      </div>

    )
  }
}

export default TripCard;