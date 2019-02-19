import React, { Component } from 'react';
import axios from 'axios';

export default class Activity extends Component {

    state = {
        edit: false,
        newActivity: ''
    }

    handleInput = (newActivity) => {
        this.setState({
            newActivity
        })
    }

    editActivity = async () => {
        const { activity_id } = this.props.activity;
        const { newActivity } = this.state;
        const res = await axios.put(`/api/activities/${activity_id}`, {
            activity_name: newActivity
        })
        this.props.getActivities();
    }

    deleteActivity = async () => {
        const { activity_id } = this.props.activity;
        const res = await axios.delete(`/api/activities/${activity_id}`);
        console.log(res);
        this.props.getActivities();
    }

    render() {
        const { activity } = this.props;
        const { edit, newActivity } = this.state;
        return (
            <>
                {activity.activity_name}
                <button
                    onClick={() => this.setState({ edit: !this.state.edit })
                    }>{edit ? <>Cancel</> : <>Edit</>}</button>
                {edit ?
                    <>
                        <input type="text" value={newActivity}
                            onChange={(e) => this.handleInput(e.target.value)} />
                        <button onClick={() => {
                            this.editActivity();
                            this.setState({ newActivity: '', edit: false })
                        }}>Save</button>
                    </>
                    : null}
                <button onClick={() => this.deleteActivity()}>Delete</button>
            </>
        )
    }
}
