import React, { Component } from 'react';
import SideNav from '../SideNav/SideNav';
import './BucketList.scss';
import Header from '../Header/Header';
import axios from 'axios';
import BucketItem from '../BucketItem/BucketItem';
import bucketListBg from '../../images/bucket-list-bg.jpg';

export default class BucketList extends Component {
   state = {
      items: [],
      completedItems: [],
      incompleteItems: [],
      itemToAdd: ''
   }

   getBucketList = async () => {
      const items = await axios.get('/bucketlist');
      await this.filterItems(items.data);
      this.setState({
         items: items.data
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

   filterItems = async (arr) => {
      let completedItems = [];
      let incompleteItems = []
      for (let i = 0; i < arr.length; i++) {
         if (arr[i].completed === true) {
            completedItems.push(arr[i])
         } else {
            incompleteItems.push(arr[i])
         }
      }
      this.setState({
         completedItems,
         incompleteItems
      })
   }

   async componentDidMount() {
      await this.getBucketList();
      // await this.filterItems(this.state.items);
   }

   render() {

      const { items, completedItems, incompleteItems } = this.state;
      const displayItems = items.map((item, index) => {
         return (
            <div key={index}>
               <BucketItem item={item} getBucketList={this.getBucketList} />
            </div>
         )
      })
      const displayCompleted = completedItems.map((item, index) => {
         return (
            <div key={index} style={{ color: 'green' }}>
               <BucketItem item={item} getBucketList={this.getBucketList} />
            </div>
         )
      })
      const displayIncomplete = incompleteItems.map((item, index) => {
         return (
            <div key={index} style={{ color: 'red' }}>
               <BucketItem item={item} getBucketList={this.getBucketList} />
            </div>
         )
      })

      return (
         <div>
            <div className='header'>
               <Header />
            </div>
            <div className='body'>
               <div className='side-nav'>
                  < SideNav />
               </div>
               <div className='content' style={{ backgroundImage: `url(${bucketListBg})`, backgroundSize: 'cover' }}>
                  <div>
                     <div className='bucket-list-content'>
                        <h2>Bucket List</h2>
                        <input type="text" value={this.state.itemToAdd} onChange={(e) => this.handleInput(e.target.value)} />
                        <button onClick={() => {
                           this.addItem(this.state.itemToAdd);
                           this.setState({ itemToAdd: '' });
                        }
                        }>Add item</button>
                        {/* {displayItems} */}
                        <div>
                           Completed
                           {displayCompleted}
                        </div>
                        <div>
                           Incomplete
                           {displayIncomplete}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
