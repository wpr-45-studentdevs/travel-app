import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';
import LandingNav from '../LandingNav/LandingNav';
import Slider from 'react-slick';
import landing1 from '../../images/landing1.jpg'
import landing2 from '../../images/landing2.jpg'
import landing3 from '../../images/landing3.jpg'
import landing4 from '../../images/landing4.jpg'
import landing5 from '../../images/landing5.jpg'
import landing6 from '../../images/landing6.jpg'
import landing7 from '../../images/landing7.jpg'
import landing8 from '../../images/landing8.jpg'
import landing9 from '../../images/landing9.jpg'
import landing11 from '../../images/landing11.jpg'
import landing12 from '../../images/landing12.jpg'
import landing13 from '../../images/landing13.jpg'



export default class LandingPage extends Component {
   render() {
      var settings = {
         dots: false,
         infinite: true,
         speed: 2500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 5500,
         pauseOnHover: false,
         initialSlide: 8,
         fade: true
      };

      const images = [
         landing1,
         landing2,
         landing3,
         landing4,
         landing5,
         landing6,
         landing7,
         landing8,
         landing9,
         landing11,
         landing12,
         landing13
      ]

      const carousel = images.map((image, i) => {
         return (
            <div>
               <img className="carousel-img" src={image} alt=""/>
            </div>
         )
      })

      return (
         <>
            <LandingNav />
            <div>
               <Slider {...settings} className='slider'>
               {carousel}
                  {/* <div>
                     <img className="carousel-img" src={landing1} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing2} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing3} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing4} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing5} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing6} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing7} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing8} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing9} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing11} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing12} alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src={landing13} alt=""/>
                  </div> */}
               </Slider>
            </div> 
            <div className="landing-page-text">
               <h3>Travel planning made easy.</h3>
               <Link to='/register' className='landing-page-register-button'>
                  Get Started
               </Link>
            </div>
         </>
      )
   }
}