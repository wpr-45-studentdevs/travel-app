import React, { Component } from 'react';
import axios from 'axios';
import './TripCard.scss';
import placeholderImage from '../../images/placeholderImage.jpg';
import Locations from '../Locations/Locations';
import Activities from '../Activities/Activities';

class TripCard extends Component {

  state = {
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
    await this.getPhotos()
    await this.getBudgetTotal()
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