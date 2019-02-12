import React, { Component } from 'react';
import SideNav from '../SideNav/SideNav';
import './BucketList.scss';

export default class BucketList extends Component {
   render() {
      return (
         <div>
            <div className='header'>
               {/* Main Header */}
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
