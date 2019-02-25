import React, { Component } from 'react';
import SideNav from '../SideNav/SideNav';
import './BucketList.scss';
import axios from 'axios';
import BucketItem from '../BucketItem/BucketItem';
import { filterItems } from '../../Logic/Logic';

export default class BucketList extends Component {
   state = {
      items: [],
      completedItems: [],
      incompleteItems: [],
      itemToAdd: ''
   }

   getBucketList = async () => {
      const items = await axios.get('/bucketlist');
      const filter = await filterItems(items.data);
      this.setState({
         items: items.data,
         completedItems: filter[0],
         incompleteItems: filter[1]
      });
      console.log(this.state)
   }

   handleInput = (itemToAdd) => {
      this.setState({
         itemToAdd
      })
   }

   addItem = async () => {
      await axios.post('/bucketlist', {
         title: this.state.itemToAdd,
         completed: false
      })
      this.getBucketList();
   }

   async componentDidMount() {
      await this.getBucketList();
   }

   render() {

      const { items, completedItems, incompleteItems } = this.state;

      const displayCompleted = completedItems.map((item, index) => {
         return (
            <div key={index} className="bucket-item">
               <BucketItem item={item} getBucketList={this.getBucketList} />
            </div>
         )
      })
      const displayIncomplete = incompleteItems.map((item, index) => {
         return (
            <div key={index} className="bucket-item">
               <BucketItem item={item} getBucketList={this.getBucketList} />
            </div>
         )
      })

      return (
         <div>
            <div className="body">
               <div className='side-nav'>
                  < SideNav />
               </div>
               <div className='bucket-list-bg'>
                  <div className="bucket-list-content">
                     <div className="bucket-list-header">
                        <h2>Completed</h2>
                        <h2>In Progress</h2>
                     </div>
                     <div className="bucket-add">
                        <input type="text" placeholder='Add a new item' value={this.state.itemToAdd} onChange={(e) => this.handleInput(e.target.value)}/>
                        <button onClick={() => {
                           this.addItem(this.state.itemToAdd);
                           this.setState({itemToAdd: ''})
                        }}>+</button>
                     </div>
                     <div className="bucket-lists">
                        <div className="bucket-list">
                           <div>{displayCompleted}</div>
                        </div>

                        <div className="bucket-list">
                           <div>{displayIncomplete}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

