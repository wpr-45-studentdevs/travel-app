import React, { Component } from 'react'
import Header from '../Header/Header'
import './Dashboard.scss';
import SideNav from '../SideNav/SideNav';
import axios from 'axios';
import { getUserData } from '../../ducks/reducer';
import { connect } from 'react-redux'

class Dashboard extends Component {
   constructor() {
      super();
      this.state = {}
   }

   async componentDidMount() {
      const res = await axios.get(`/auth/userData`);
      if(res.data) {
         this.props.getUserData()
      }
   }

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

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData })(Dashboard) 