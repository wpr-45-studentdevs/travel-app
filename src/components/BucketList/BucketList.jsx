import React, { Component } from 'react';
import SideNav from '../SideNav/SideNav';
import './BucketList.scss';
import Header from '../Header/Header';

export default class BucketList extends Component {
   render() {
      return (
         <div>
            <div className='header'>
            <Header/>
            </div>
            <div className='body'>
               <div className='side-nav'>
                  < SideNav />
               </div>
               <div className='content'>
                  <div className='content-window'>
                     <h2>Bucket List</h2>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
