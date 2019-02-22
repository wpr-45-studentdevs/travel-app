import React, { Component } from 'react';
import axios from 'axios';
import Activity from './Activity';

export default class Activities extends Component {
    state = {
        activities: [],
        newActivity: ''
    }

    handleInput = (newActivity) => {
        this.setState({
            newActivity
        })
    }

    getActivities = async () => {
        const { trip_id } = this.props.trip
        let res = await axios.get(`/api/activities/${trip_id}`)
        this.setState({
            activities: res.data
        })
    }

    addActivity = async () => {
        const { trip_id } = this.props.trip;
        const { newActivity } = this.state;
        await axios.post(`/api/activities/${trip_id}`, {
            activity_name: newActivity
        })
        await this.getActivities();
    }

    async componentDidMount() {
        await this.getActivities();
    }

    render() {
        const { activities, newActivity } = this.state;
        const displayActivities = activities.map((activity, i) => {
            return (
                <div key={i}>
                    <Activity activity={activity} getActivities={this.getActivities} />
                </div>
            )
        })
        return (
            <>
                <div className="detail-header">
                    <h2>Activities</h2>
                    <input
                        type="text"
                        value={newActivity}
                        onChange={(e) => this.handleInput(e.target.value)} />
                    <button onClick={() => {
                        this.addActivity();
                        this.setState({ newActivity: '' })
                    }}><i className="fas fa-plus"></i></button>
                </div>
                <div className="detail-list">
                    {displayActivities}
                </div>
            </>
        )
    }
}