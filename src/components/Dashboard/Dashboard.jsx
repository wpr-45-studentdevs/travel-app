import React, { Component } from "react";
import Header from "../Header/Header";
import "./Dashboard.scss";
import SideNav from "../SideNav/SideNav";
import axios from "axios";

export default class Dashboard extends Component {
   state = {
      publicTrips: [],
      search: ""
   };

   handleSearchTripsInput = value => {
      this.setState({ search: value });
   };

   //DO NOT DELETE!! THIS IS THE FUNCTION TO GET TRIPS FROM DATABASE!!!!
   async componentDidMount() {
      try {
         const res = await axios.get("/trips/getAllPublic");
         this.setState({ publicTrips: res.data });
      } catch (e) {
         console.log("problems");
      }
   }

   render() {
      let filteredArr = this.state.publicTrips;
      if (this.state.search) {
         filteredArr = this.state.publicTrips.filter((object, index) => {
            let passed = false;
            for (let property in object) {
               if (typeof object[property] === "string") {
                  if (
                     object[property]
                        .toLowerCase()
                        .includes(this.state.search.toLowerCase())
                  ) {
                     passed = true;
                  }
               }
            }
            if (passed === true) {
               return true;
            } else {
               return false;
            }
         });
      }
      const showPublicTrips = filteredArr.map((trip, i) => {
         return (
            <div key={i}>
               <div>{trip.trip_name} {trip.date}</div>
            </div>
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
                  <input
                     onChange={e => this.handleSearchTripsInput(e.target.value)}
                     type="text"
                  />
                  <div className="content-window">
                     {/* {tripToDisplay} */}
                     <div>{showPublicTrips}</div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
