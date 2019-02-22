import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/detail.scss';
import './Location.scss';

export default class Location extends Component {

    state = {
        edit: false,
        newLocation: this.props.location.location_name,
        deletedLocation: []
    }

    editLocation = async () => {
        const { location_id } = this.props.location;
        const { newLocation } = this.state;

        if (!newLocation) {
            return;
        }

<<<<<<< HEAD
        await axios.put(`/api/locations/${location_id}`, {
=======
        const res = await axios.put(`/api/locations/${location_id}`, {
>>>>>>> master
            location_name: newLocation
        })
        await this.props.getLocations();
    }

    deleteLocation = async () => {
        const { location_id } = this.props.location;

        const res = await axios.delete(`/api/locations/${location_id}`);

        this.setState({ deletedLocation: res.data[0] })
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
            <div className="detail">
                <div className="detail-name">
                    <i className="fas fa-map-marker-alt"></i>
                    {
                        edit ? <><input
                            className="detail-input"
                            type="text"
                            value={newLocation}
                            onChange={(e) => this.handleInput(e.target.value)}
                            />
                        </> : <>{location.location_name}</>
                    }
                </div>
                <div>
                    <i className={edit ? "fas fa-times cancel-edit list-icon" : "fas fa-edit list-icon"} onClick={() => this.setState({ edit: !this.state.edit })}></i>
                    {edit ?
                        <>
                            <i
                                className="fas fa-check list-icon"
                                onClick={() => {
                                    this.editLocation();
                                    this.setState({ edit: false })
                                }}
                            ></i>
                        </>
                        :
                        <i
                            className="fas fa-trash list-icon"
                            onClick={() => this.deleteLocation()}
                        ></i>}
                </div>
            </div>
        )
    }
}
