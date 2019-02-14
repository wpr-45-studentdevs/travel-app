import React, { Component } from "react";
import Header from "../Header/Header";
import "./Dashboard.scss";
import SideNav from "../SideNav/SideNav";
import axios from "axios";

export default class Dashboard extends Component {
  state = {
    publicTrips: [
      {
        photos: [
          "https://d3hne3c382ip58.cloudfront.net/resized/750x420/4-days-3-nights-amazing-tanzania-safari-experience-tour-2-31090_1510029029.JPG"
        ],
        title: "Southern Africa",
        activities: ["safari", "get chased by a cheetah", "blessed the rains"],
        locations: ["tanzania", "zimbabwe"],
        dates: "5/20/19 - 6/3/19",
        budget: "$3000"
      },

      {
        photos: [
          "https://www.barcelo.com/pinandtravel/wp-content/uploads/2018/04/Apertura1-3-1170x532.jpg"
        ],
        title: "Mexico",
        activities: ["swim in a cenote", "experience a strong undertow"],
        locations: ["yacatan peninsula", "chichen itza"],
        dates: "6/20/19 - 7/3/19",
        budget: "$1000"
      }
    ]
  };

  //DO NOT DELETE!! THIS IS THE FUNCTION TO GET TRIPS FROM DATABASE!!!!
  //  async componentDidMount() {
  //    try {const res =  await axios.get('/trips/getAllPublic')
  //     this.setState({publicTrips: res.data})}
  //     catch (e){
  //        console.log('problems')
  //     }
  //   }

  render() {
     const showPublicTrips = this.state.publicTrips.map((el, i) => {
       return (
         <div>
           <img src={el.photos} alt="" />
           <div key={i}>{el.title}</div>
         </div>
       );
     });
   //  let tripToDisplay = this.state.publicTrips.map((trip, i) => {
   //    let activities = trip.activities.map((activity, i) => {
   //      return <li key={i}>{activity}</li>;
   //    });
   //    let locations = trip.locations.map((location, i) => {
   //      return <li key={i}>{location}</li>;
   //    });
   //    return (
   //    <div key={i} className="dashCard" >
   //          <img src={trip.photos[0]} alt="mainphoto" />

   //        <div className='cardInfo'>
   //           <h3>{trip.title}</h3> 
   //           <div className="listFlex">
   //             <div>
   //               <h4>Activities:</h4>
   //               <ul>{activities}</ul>
   //             </div>
   //             <div>
   //               <h4>Locations:</h4>
   //               <ul>{locations}</ul>
   //             </div>
   //             <br />
   //           </div>
   //           <h4>Budget: {trip.budget}</h4>
   //        </div>
   //      </div> 
   //    );
   //  });
    return (
      <div>
        <Header />
        <div className="body">
          <div className="side-nav">
            <SideNav />
          </div>
          <div className="content">
            <div className="content-window">
              {/* {tripToDisplay} */}
           <h3>{showPublicTrips}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
