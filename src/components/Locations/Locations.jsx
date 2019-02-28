import React, { Component } from 'react';
import axios from 'axios';
import Location from './Location';
import '../../styles/detail.scss';
import './Locations.scss';
import Swal from 'sweetalert'

export default class Locations extends Component {
  state = {
    locations: [],
    locationToAdd: ""
  };

  getLocations = async () => {
    const { trip_id } = this.props.trip;
    const res = await axios.get(`/api/locations/${trip_id}`);
    this.setState({
      locations: res.data
    });
  };

  addLocation = async () => {
    const { trip_id } = this.props.trip;
    const { locationToAdd } = this.state;

    if(locationToAdd){
      await axios.post(`/api/locations/${trip_id}`, {
        location_name: locationToAdd,
        trip_id
      });
      await this.getLocations();
    } else {
      Swal('Please enter an location to add')
    }
  };

  handleInput = locationToAdd => {
    this.setState({
      locationToAdd
    });
  };

  async componentDidMount() {
    await this.getLocations();
  }

  render() {
    const { locations, locationToAdd } = this.state;
    const displayLocations = locations.map((location, i) => {
      return (
        <div key={i}>
          <Location location={location} getLocations={this.getLocations} />
        </div>
      );
    })

    

        return (
            <>
                <div className="detail-header">
                    <h2>Locations</h2>
                    <input
                        type="text"
                        value={locationToAdd}
                        onChange={(e) => this.handleInput(e.target.value)} />
                    <button className='add-button' onClick={() => {
                        this.addLocation();
                        this.setState({
                            locationToAdd: ''
                        })
                    }}><i className="fas fa-plus"></i></button>
                </div>
                <div className='detail-list'>
                    {displayLocations}
                </div>
            </>
        )
    }
}
