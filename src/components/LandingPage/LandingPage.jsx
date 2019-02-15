import React, { Component } from 'react'
import './LandingPage.scss';
import LandingNav from '../LandingNav/LandingNav';
// import Slider from 'react-slick';
import { Fade } from 'react-slideshow-image';
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

      const fadeImages = [
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
         // 'https://img.huffingtonpost.com/asset/5a25a7291400001d57b6b5a8.jpeg?cache=gvij4youfr&ops=1910_1000',
         // 'https://i.kym-cdn.com/entries/icons/original/000/026/111/4917038d8bbd7fe362bed691690c7da4.jpg',
         // 'https://vignette.wikia.nocookie.net/christmasspecials/images/d/d6/Mr.Krabs.jpg/revision/latest?cb=20101201062252'
      ]

      const fadeProperties = {
         duration: 5000,
         transitionDuration: 1000,
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
                           <div key={i}>
                              <div className='each-fade'>
                                 <div className='image-container'>
                                    <img className='slide-img' src={each} alt="" />
                                 </div>
                              </div>
                           </div>
                        )
                     })
                  }
               </Fade>
            </>
         )
      }
      return (
         <>
            <LandingNav/>
            {Slideshow()}
         </>
      )
   }
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



// export default class LandingPage extends Component {
//    render() {
//       var settings = {
//          dots: false,
//          infinite: true,
//          speed: 1200,
//          slidesToShow: 1,
//          slidesToScroll: 1,
//          autoplay: true,
//          autoplaySpeed: 4500,
//          pauseOnHover: false,
//          initialSlide: 8,
//       };

//       return (
//          <>
//             <LandingNav />
//             {/* <div> */}
//                {Slideshow()}
//             {/* </div> */}
//             {/* <div>I will be a carousel</div>
//             <div>
//                <Slider {...settings} className='slider'>
//                   <div>
//                      <img className="carousel-img" src={landing1} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing2} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing3} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing4} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing5} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing6} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing7} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing8} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing9} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing11} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing12} alt=""/>
//                   </div>
//                   <div>
//                      <img className="carousel-img" src={landing13} alt=""/>
//                   </div>
//                </Slider>
//             </div> */}

//          </>
//       )
//    }
// }
