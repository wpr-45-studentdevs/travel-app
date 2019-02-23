import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BucketList from './components/BucketList/BucketList';
import Dashboard from './components/Dashboard/Dashboard';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import MyTrips from './components/MyTrips/MyTrips';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Budget from './components/Budget/Budget';



export default (
   <Switch>
      <Route component={LandingPage} exact path='/' ></Route>
      <Route component={Login} path='/login' ></Route>
      <Route component={Register} path='/register' ></Route>
      <Route component={Dashboard} path='/dashboard' ></Route>
      <Route component={Profile} path='/profile' ></Route>
      <Route component={MyTrips} path='/my-trips' ></Route>
      <Route component={BucketList} path='/bucket-list' ></Route>
      <Route component={Budget} path='/budget/' ></Route>
   </Switch>
)