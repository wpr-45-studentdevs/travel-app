import React, { Component } from 'react'
import axios from 'axios';
import './BucketItem.scss';

export default class BucketItem extends Component {
    state = {
        edit: false,
        userInput: ''
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
            userInput: '',
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
            <>
                <li className={item.completed ? 'bucket-item-complete' : 'bucket-item-incomplete'}>{item.title}</li>
                <button onClick={() => this.toggleCompleted(item)}>Done</button>
                <button onClick={() => this.setState({ edit: !this.state.edit })}>
                {edit ? <>Cancel</> : <>Edit</>}
                </button>
                {edit ?
                    <>
                        <input type="text" value={this.state.userInput} onChange={(e) => this.handleInput(e.target.value)} />
                        <button onClick={() => { this.editItem(item) }
                        }>Save</button>
                    </>
                    :
                    <>
                        <button onClick={() => this.deleteItem(item)}>Delete</button>
                    </>}
            </>
        )
    }
}
