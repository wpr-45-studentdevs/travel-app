import React, { Component } from 'react';
import axios from 'axios';
import './Activity.scss';

export default class Activity extends Component {

    state = {
        edit: false,
        newActivity: this.props.activity.activity_name,
        deletedActivity: []
    }

    handleInput = (newActivity) => {
        this.setState({
            newActivity
        })
    }

    editActivity = async () => {
        const { activity_id } = this.props.activity;
        const { newActivity } = this.state;

        if (!newActivity) {
            return;
        }

<<<<<<< HEAD
        await axios.put(`/api/activities/${activity_id}`, {
=======
        const res = await axios.put(`/api/activities/${activity_id}`, {
>>>>>>> master
            activity_name: newActivity
        })
        await this.props.getActivities();
    }

    deleteActivity = async () => {
        const { activity_id } = this.props.activity;
        const res = await axios.delete(`/api/activities/${activity_id}`);
        this.setState({ deletedActivity: res.data[0] });
        await this.props.getActivities();
    }

    render() {
        const { activity } = this.props;
        const { edit, newActivity } = this.state;
        return (
            <div className="detail">
                <div className="detail-name">
                    <i className="fas fa-bus"></i>
                    {
                        edit ? <><input
                            type="text"
                            value={newActivity}
                            onChange={(e) => this.handleInput(e.target.value)}
                        /></> :
                            <>{activity.activity_name}</>
                    }
                </div>
                <div>
                    <i className={edit ? "fas fa-times cancel-edit list-icon" :
                        "fas fa-edit list-icon"}
                        onClick={() => this.setState({ edit: !this.state.edit })}></i>
                        {
                            edit ? 
                            <>
                                <i
                                className="fas fa-check list-icon"
                                onClick={() => {
                                    this.editActivity();
                                    this.setState({edit: false})
                                }}>

                                </i>
                            </> :
                            <i className="fas fa-trash list-icon"
                            onClick={() => this.deleteActivity()}>
                            </i>
                        }
                </div>
                {/* <button
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
                <button onClick={() => this.deleteActivity()}>Delete</button> */}
            </div>
        )
    }
}
