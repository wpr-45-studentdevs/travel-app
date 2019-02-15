require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const tripCtrl = require('./controllers/tripController')
const authController = require('./controllers/authController');
const tripController = require('./controllers/tripController')
const bucketController = require('./controllers/bucketController');

const { CONNECTION_STRING, SERVER_PORT, SECRET,  } = process.env;

const app = express();

//MIDDLEWARE
app.use(express.json())
app.use(session({
   secret: SECRET,
   resave: false,
   saveUninitialized: false
}))

//DATABASE CONNECTION
massive(CONNECTION_STRING).then(db => {
   app.set('db', db)
      console.log('Connected to database')
   app.listen(SERVER_PORT, () => {
      console.log(`Listening on port: ${SERVER_PORT}`)
   })
})

//AUTH ENDPOINTS
app.post('/auth/register', authController.register) //register new user
app.post('/auth/login', authController.login) //login
app.get('/auth/userData', authController.userData) // gets user data off the session to see if they're logged in
app.get('/auth/logout', authController.logout) //logout

//BUCKET LIST ENDPOINTS

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
//ENDPOINTS

//Public trips
app.get('/trips/getAllPublic', tripController.getAllPublicTrips)



//individual user's trips
app.get('/api/userTrips/:user_id', tripCtrl.getUserTrips)

app.get('/api/activities/:trip_id', tripCtrl.getActivities)

app.get('/api/locations/:trip_id', tripCtrl.getLocations)

app.get('/api/trip-photos/:trip_id', tripCtrl.getPhotos)

app.get('/api/budget/:trip_id', tripCtrl.getBudget)

// app.post('/api/tripInfo', tripCtrl.getSingleTrip)

