import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import Header from '../Header/Header';
import './Budget.scss';

export default class Budget extends Component {
   constructor(props) {
      super(props);
      this.state = {
         flights: 0,
         accommodation: 0,
         food: 0,
         spending: 0,
      }
   }

   handleChange = (property, value) => {
      if(isNaN(value)) {
         alert('Must enter a number')
         this.setState({ [property]: 0 })
      }
      this.setState({ [property]: value })
   }



   render() {
      const { flights, accommodation, food, spending } = this.state;
      let total = (flights * 1) + (accommodation * 1) + (food * 1) + (spending * 1);
      return (
         <div>
            <div className='header'>
            <Header/>
            </div>
            <div className='body'>
               <div className='side-nav'>
                  < SideNav />
               </div>
               <div className='content'>
                  <div className='content-window'>
                     <h2>Trip Budget</h2>
                     
                     <div className='budget-inputs'>
                        <h3>
                           Flights
                        </h3> 
                        <input 
                           type="text"
                           value={this.state.flights}
                           onChange={ (e) => { this.handleChange('flights', e.target.value )}}
                        />
                        <h3>
                           Accommodation
                        </h3>
                        <input 
                           type="text"
                           value={this.state.accommodation}
                           onChange={ (e) => { this.handleChange('accommodation', e.target.value)}}
                        />
                        <h3>
                           Food
                        </h3>
                        <input 
                           type="text"
                           value={this.state.food}
                           onChange={ (e) => { this.handleChange('food', e.target.value)}}
                        />
                        <h3>
                           Spending
                        </h3>
                        <input 
                           type="text"
                           value={this.state.spending}
                           onChange={ (e) => { this.handleChange('spending', e.target.value)}}
                        />
                     </div>
                     <div className='budget-total'>
                        <h2>
                           Total: {total}
                        </h2>
                     </div>
                     <Link to='/my-trips'>
                        <button>Back to My Trips</button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
