import React, { Component } from 'react';
import SideNav from '../SideNav/SideNav';
import './BucketList.scss';
import Header from '../Header/Header';
import axios from 'axios';
import BucketItem from '../BucketItem/BucketItem';

export default class BucketList extends Component {
   state = {
      items: [],
      itemToAdd: ''
   }

   getBucketList = async () => {
      const items = await axios.get('/bucketlist');
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

   async componentDidMount() {
      await this.getBucketList();
   }

   render() {

      const { items } = this.state;
      const displayItems = items.map((item, index) => {
         return (

            <div key={index}>
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
               {/* Content and content-window class names already exist */}
               <div className='content'>
                  <div className='content-window'>
                     <h2>Bucket List</h2>
                     <input type="text" value={this.state.itemToAdd} onChange={(e) => this.handleInput(e.target.value)} />
                     <button onClick={() => {
                        this.addItem(this.state.itemToAdd);
                        this.setState({ itemToAdd: '' });
                     }
                     }>Add item</button>
                     {displayItems}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
