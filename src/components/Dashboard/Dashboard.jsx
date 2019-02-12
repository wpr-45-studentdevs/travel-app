import React, { Component } from 'react'
import Header from '../Header/Header'
import './Dashboard.scss';
import SideNav from '../SideNav/SideNav';

export default class Dashboard extends Component {
   render() {
      return (
         <div>
            <Header/>
            <div className='body'>
               <div className='side-nav'>
                  < SideNav />
               </div>
               <div className='content'>
                  <div className='content-window'>
                     <h2>News Feed</h2>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

