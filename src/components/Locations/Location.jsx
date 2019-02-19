import React, { Component } from 'react';
import axios from 'axios';

export default class Location extends Component {

    state = {
        edit: false,
        newLocation: '',
        deletedLocation: []
    }

    updateLocation = async () => {
        const { location_id } = this.props.location;
        const { newLocation } = this.state;

        const res = await axios.put(`/api/locations/${location_id}`, {
            location_name: newLocation
        })
        await this.props.getLocations();
    }

    deleteLocation = async () => {
        const {location_id} = this.props.location;
        
        const res = await axios.delete(`/api/locations/${location_id}`);

        this.setState({deletedLocation: res.data[0]})
        await this.props.getLocations();
    }

    handleInput = (newLocation) => {
        this.setState({
            newLocation
        })
    }

    render() {
        const { location } = this.props;
        const { edit, newLocation } = this.state;
        return (
            <>
                {location.location_name}
                <button onClick={() => this.setState({ edit: !this.state.edit })}>
                    {
                        edit ? <>Cancel</> : <>Edit</>
                    }
                </button>
                {edit ?
                    <>
                        <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => this.handleInput(e.target.value)} />
                        <button
                        onClick={() => {
                            this.updateLocation();
                            this.setState({newLocation: '', edit: false})
                        }}>Save</button>
                    </>
                    :
                    null}
                <button
                onClick={() => {
                    this.deleteLocation();
                }}>Delete</button>
            </>
        )
    }
}
