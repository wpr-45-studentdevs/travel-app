import React, { Component } from 'react'
import './LandingPage.scss';
import LandingNav from '../LandingNav/LandingNav';

export default class LandingPage extends Component {
   render() {
      return (
         <>
            <LandingNav />
            <div>I will be a carousel</div>
         </>
      )
   }
}
