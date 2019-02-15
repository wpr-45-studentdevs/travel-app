import React, { Component } from 'react'
import './LandingPage.scss';
import LandingNav from '../LandingNav/LandingNav';
// import Slider from 'react-slick';
import { Fade } from 'react-slideshow-image';

export default class LandingPage extends Component {
   render() {

      const fadeImages = [
         'https://img.huffingtonpost.com/asset/5a25a7291400001d57b6b5a8.jpeg?cache=gvij4youfr&ops=1910_1000',
         'https://i.kym-cdn.com/entries/icons/original/000/026/111/4917038d8bbd7fe362bed691690c7da4.jpg',
         'https://vignette.wikia.nocookie.net/christmasspecials/images/d/d6/Mr.Krabs.jpg/revision/latest?cb=20101201062252'
      ]

      const fadeProperties = {
         duration: 5000,
         transitionDuration: 500,
         infinite: true,
         indicators: false,
         arrows: false
      }

      const Slideshow = () => {
         return (
            <>
               <Fade {...fadeProperties}>
                  {/* <div className='each-fade'>
                     <div className='image-container'>
                        <img src={fadeImages[0]} alt="" />
                     </div>
                     <h2>First Slide</h2>
                  </div>
                  <div className='each-fade'>
                     <div className='image-container'>
                        <img src={fadeImages[1]} alt="" />
                     </div>
                     <h2>Second Slide</h2>
                  </div>
                  <div className='each-fade'>
                     <div className='image-container'>
                        <img src={fadeImages[2]} alt="" />
                     </div>
                     <h2>Third Slide!</h2>
                  </div> */}
                  {
                     fadeImages.map((each, i) => {
                        return (
                           <>
                              <div className='each-fade'>
                                 <div className='image-container'>
                                    <img src={each} alt="" />
                                 </div>
                              </div>
                           </>
                        )
                     })
                  }
               </Fade>
            </>
         )
      }
      // var settings = {
      //    dots: true,
      //    infinite: true,
      //    speed: 500,
      //    slidesToShow: 1,
      //    slidesToScroll: 1,
      //    autoplay: true,
      //    autoplaySpeed: 4500,
      // };

      return (
         <>
            <LandingNav />
            {/* <div> */}
               {Slideshow()}
            {/* </div> */}
            {/* <div>I will be a carousel</div>
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
            </div> */}

         </>
      )
   }
}
