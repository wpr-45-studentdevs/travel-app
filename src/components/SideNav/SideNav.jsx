import React from 'react';
import { Link } from 'react-router-dom';
import '../SideNav/SideNav.scss';

export default function SideNav() {
   return (
      <div className='side-navbar'>
         <ul>
            <li className='add-trip-button'>Add Trip</li>
            <Link to='my-trips'>
               <li>My Trips</li>
            </Link>
            <Link to='/bucket-list'>
               <li>Bucket List</li>
            </Link>
         </ul>
      </div>
   )
}