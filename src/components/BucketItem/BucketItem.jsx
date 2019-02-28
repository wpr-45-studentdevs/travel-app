import React, { Component } from 'react'
import axios from 'axios';
import './BucketItem.scss';
import { Spring } from 'react-spring/renderprops';

export default class BucketItem extends Component {
    state = {
        edit: false,
        userInput: this.props.item.title
    }

    toggleCompleted = async (item) => {
        await axios.put(`/bucketlist/${item.bucket_list_id}`, {
            title: item.title,
            completed: !item.completed
        })
        await this.props.getBucketList();
    }

    handleInput = (userInput) => {
        this.setState({
            userInput
        })
    }

    editItem = async (item) => {
        await axios.put(`/bucketlist/${item.bucket_list_id}`, {
            title: this.state.userInput,
            completed: item.completed
        })
        this.setState({
            edit: false
        })
        this.props.getBucketList();
    }

    deleteItem = async (item) => {
        await axios.delete(`/bucketlist/${item.bucket_list_id}`);
        this.props.getBucketList();
    }

    render() {
        const { item } = this.props;
        const { edit } = this.state;
        return (
            <Spring
                delay={250}
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}>
                {({ opacity }) => (
                    <div style={{ opacity }} className="bucket-item-container">
                        <h2>
                            {
                                edit ?
                                    <><input
                                        type="text"
                                        defaultValue={this.state.userInput}
                                        onChange={(e) => this.handleInput(e.target.value)} /></>
                                    : <div className="bucket-item-title">{item.title}</div>
                            }
                        </h2>
                        <div className="bucket-item-options">
                            {
                                edit ? null : <><i
                                className={item.completed ? "fas fa-times" : "fas fa-check"}
                                onClick={() => this.toggleCompleted(item)}></i></>  
                            }
                            
                            <i
                                className="fas fa-edit"
                                onClick={() => {
                                    if (edit) { this.editItem(item) }
                                    this.setState({ edit: !this.state.edit });
                                }}>
                            </i>
                            <i
                                className="fas fa-trash"
                                onClick={() => {
                                    this.deleteItem(item)
                                }}>
                            </i>
                        </div>
                    </div>
                )}
            </Spring>
        )
    }
}