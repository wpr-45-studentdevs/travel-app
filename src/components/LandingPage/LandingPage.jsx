import React, { Component } from 'react'
import './LandingPage.scss';
import LandingNav from '../LandingNav/LandingNav';
import Slider from 'react-slick';

export default class LandingPage extends Component {
   render() {
      var settings = {
         dots: true,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 4500,
      };

      return (
         <>
            <LandingNav />
            <div>I will be a carousel</div>
            <div>
               <Slider {...settings}>
                  <div>
                     <img className="carousel-img" src="https://img.huffingtonpost.com/asset/5a25a7291400001d57b6b5a8.jpeg?cache=gvij4youfr&ops=1910_1000" alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src="https://i.kym-cdn.com/entries/icons/original/000/026/111/4917038d8bbd7fe362bed691690c7da4.jpg" alt=""/>
                  </div>
                  <div>
                     <img className="carousel-img" src="https://vignette.wikia.nocookie.net/christmasspecials/images/d/d6/Mr.Krabs.jpg/revision/latest?cb=20101201062252" alt=""/>
                  </div>
               </Slider>

               
            </div>

         </>
      )
   }
}
