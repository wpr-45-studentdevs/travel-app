import React, { Component } from "react";
import "./MyTrips.scss";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserData } from '../../ducks/reducer'
import Trip from "../Trip/Trip";

class MyTrips extends Component {
  state = {
    trips: [
      // {
      //   photos: ['https://d3hne3c382ip58.cloudfront.net/resized/750x420/4-days-3-nights-amazing-tanzania-safari-experience-tour-2-31090_1510029029.JPG'],
      //   title: 'Southern Africa',
      //   activities: ['safari', 'get chased by a cheetah', 'blessed the reigns'],
      //   locations: ['tanzania', 'zimbabwe'],
      //   dates: '5/20/19 - 6/3/19',
      //   budget: '$3000'

      // },

      // {
      //   photos: ['https://www.barcelo.com/pinandtravel/wp-content/uploads/2018/04/Apertura1-3-1170x532.jpg'],
      //   title: 'Mexico',
      //   activities: ['swim in a cenote', 'experience a strong undertow'],
      //   locations: ['yacatan peninsula', 'chichen itza'],
      //   dates: '6/20/19 - 7/3/19',
      //   budget: '$1000'
      // }
    ]
  };

  componentDidMount() {
    this.getTrips()
  }


  getTrips = async () => {
    const { user_id } = this.props
    let res = await axios.get(`/api/userTrips/${user_id}`)
    this.setState({
      trips: res.data
    })
  }


  render() {
    let tripToDisplay = this.state.trips.map((trip, i) => {
      return (
        <Trip
        trip={trip}
        key={i}/>
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

const mapStateToProps = (reduxState) => {
  const { user } = reduxState
  return user
}

export default connect(mapStateToProps, { getUserData })(MyTrips)