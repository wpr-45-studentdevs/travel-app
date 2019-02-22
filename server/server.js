require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const tripCtrl = require('./controllers/tripController')
const authController = require('./controllers/authController');
const bucketController = require('./controllers/bucketController');
const userCtrl = require('./controllers/userInfoController');
const budgetController = require('./controllers/budgetController');
const notesController = require('./controllers/notesController');
const travelerCtrl = require('./controllers/travelerController')
const locationController = require('./controllers/locationController');
const activitiesController = require('./controllers/activityController');

const {
   CONNECTION_STRING,
   SERVER_PORT,
   SECRET
} = process.env;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(
   session({
      secret: SECRET,
      resave: false,
      saveUninitialized: false
   })
);

//DATABASE CONNECTION
massive(CONNECTION_STRING).then(db => {
   app.set("db", db);
   console.log("Connected to database");
   app.listen(SERVER_PORT, () => {
      console.log(`Listening on port: ${SERVER_PORT}`);
   });
});

//ENDPOINTS

//Auth
app.post('/auth/register', authController.register) //register new user
app.post('/auth/login', authController.login) //login
app.get('/auth/userData', authController.userData) // gets user data off the session to see if they're logged in
app.get('/auth/logout', authController.logout) //logout


//Bucket List
//Returns bucket list of the user on sessions
app.get('/bucketlist', bucketController.getBucketList);
//Creates a new bucket list item 
//Returns bucket list of the user on sessions
app.post('/bucketlist', bucketController.addBucketListItem);
//Updates a bucket list item
//Returns bucket list of the user on sessions
app.put('/bucketlist/:bucket_list_id', bucketController.updateBucketListItem);
//Deletes a bucket list item
//Returns the deleted item
app.delete('/bucketlist/:bucket_list_id', bucketController.deleteBucketListItem);


//Trip
//Public trips
app.get('/trips/getAllPublic', tripCtrl.getAllPublicTrips)
app.get('/api/trips/users/:trip_id', tripCtrl.getTripUsers)
//individual user's trips
app.delete('/api/trip/:trip_id', tripCtrl.deleteTrip)
app.put('/api/trip/public', tripCtrl.updateTripPublic)
app.put('/api/trip/completed', tripCtrl.updateTripCompleted)
app.post('/api/add-trip', tripCtrl.addTrips)
app.post('/api/add-user-to-trip/:trip_id', tripCtrl.addUserToTrip)
app.get('/api/userTrips/:user_id', tripCtrl.getUserTrips)
app.get('/api/trip-photos/:trip_id', tripCtrl.getPhotos)
app.get('/api/trips/completed/:user_id', tripCtrl.getCompletedTrips)


// User Profile Info
app.get('/api/userInfo/:user_id', userCtrl.getUserInfo)
app.put('/api/userInfo/:user_id', userCtrl.editUserInfo)

app.post('/api/add-user-to-trip/:trip_id', tripCtrl.addUserToTrip)

// user's profile info
app.get("/api/userInfo/:user_id", userCtrl.getUserInfo);
//Budget
app.get('/api/budget/:trip_id', budgetController.getBudget);
app.post('/api/budget/', budgetController.addBudgetItem);
app.put('/api/budget', budgetController.updateBudgetItem);
app.delete('/api/budget/:budget_item_id', budgetController.deleteBudgetItem)

//Trip Notes Endpoints
app.get(`/api/notes/:trip_id`, notesController.getNotes)
app.put('/api/notes', notesController.addNotes);

//Travelers
app.post('/api/travelers/:trip_id/:user_id', travelerCtrl.addTravelers)
app.delete('/api/travelers/:bridge_id', travelerCtrl.removeTraveler)

//Friends
app.get('/api/userFriends/:user_id', userCtrl.getUserFriends)
app.get('/api/trip/friends/:user_id/:trip_id', userCtrl.getFriendsNotOnTrip)
app.post('/api/friend/:user_id', userCtrl.addFriend)
app.delete('/api/friend/:user_id/:friend_id', userCtrl.removeFriend)

//Locations
//returns an array of all the locations of a given trip
app.get('/api/locations/:trip_id', locationController.getLocations);
//adds a location to a trip's locations
//returns added location
app.post('/api/locations/:trip_id', locationController.addLocation);
//updates a location on a trip's locations
//return updated location
app.put('/api/locations/:location_id', locationController.editLocation);
//deletes a location from a trip
//returns the deleted locatoin
app.delete('/api/locations/:location_id', locationController.deleteLocation);


//Activities
//returns all activities for a given trip
app.get('/api/activities/:trip_id', activitiesController.getActivities);
//add a new activity to a trip
//returns the new activity
app.post('/api/activities/:trip_id', activitiesController.addActivity);
//updates an activity on a trip
//returns the updated activity
app.put('/api/activities/:activity_id', activitiesController.editActivity);
//deletes an activity
//returns the deleted activity
app.delete('/api/activities/:activity_id', activitiesController.deleteActivity);
