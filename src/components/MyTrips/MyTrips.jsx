import React, { Component } from "react";
import "./MyTrips.scss";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";

export default class MyTrips extends Component {
  state = {
    trips: [
      {
        photos: [
          "https://d3hne3c382ip58.cloudfront.net/resized/750x420/4-days-3-nights-amazing-tanzania-safari-experience-tour-2-31090_1510029029.JPG"
        ],
        title: "Southern Africa",
        activities: ["safari"],
        locations: ["tanzania"],
        dates: "5/20/19 - 6/3/19",
        budget: "$3000"
      },

      {
        photos: [
          "https://www.barcelo.com/pinandtravel/wp-content/uploads/2018/04/Apertura1-3-1170x532.jpg"
        ],
        title: "Mexico",
        activities: ["swim in a cenote"],
        locations: ["yacatan peninsula"],
        dates: "6/20/19 - 7/3/19",
        budget: "$1000"
      }
    ]
  };
  render() {
    let tripToDisplay = this.state.trips.map((trip, i) => {
      return (
        <div className="tripCard">
          <div className="mainPhoto">
            <img src={trip.photos[0]} alt="mainphoto" />
          </div>
          <h3>{trip.title}</h3>
          <div className="listFlex">
            <div>
              <h4>Activities:</h4>
              <ul>
                <li>{trip.activities[0]}</li>
              </ul>
            </div>
            <div>
              <h4>Locations:</h4>
              <ul>
                <li>{trip.locations[0]}</li>
              </ul>
            </div>
            <br />
          </div>
          <h4>Budget: {trip.budget}</h4>
        </div>
        //photo will be either main photo chosen-> will need updated table
        // or just random photo/ first photo
        //activities need to be mapped
        //locations need to be mapped
        //budget will be calculated total
      );
    });
    return (
      <div>
        <Header />
        <div className="body">
          <div className="side-nav">
            <SideNav />
          </div>
          <div className="content">
            <div className="content-window">
              <h1>My Trips</h1>
              <br />
              <div className="tripDisplay">{tripToDisplay}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//
