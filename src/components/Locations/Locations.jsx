import React, { Component } from 'react';
import axios from 'axios';
import Location from './Location';

export default class Locations extends Component {

    state = {
        locations: [],
        locationToAdd: ''
    }

    getLocations = async () => {
        const { trip_id } = this.props.trip;
        const res = await axios.get(`/api/locations/${trip_id}`);
        this.setState({
            locations: res.data
        })
    }

    addLocation = async () => {
        const { trip_id } = this.props.trip;
        const { locationToAdd } = this.state

        const result = await axios.post(`/api/locations/${trip_id}`, {
            location_name: locationToAdd,
            trip_id
        })
        await this.getLocations();
    }

    handleInput = (locationToAdd) => {
        this.setState({
            locationToAdd
        })
    }

    async componentDidMount() {
        await this.getLocations();
    }

    render() {
        const { locations, locationToAdd } = this.state;
        const displayLocations = locations.map((location, i) => {
            return (
                <div key={i}>
                    <Location location={location} getLocations={this.getLocations}/>
                </div>
            )
        })

        return (
            <div>
                <h2>Locations</h2>
                <input
                    type="text"
                    value={locationToAdd}
                    onChange={(e) => this.handleInput(e.target.value)} />
                <button onClick={() => {
                    this.addLocation();
                    this.setState({
                        locationToAdd: ''
                    })
                }}>+</button>
                {displayLocations}
            </div>
        )
    }
}
