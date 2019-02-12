require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const tripCtrl = require('./controllers/tripController')

const { CONNECTION_STRING, SERVER_PORT, SECRET } = process.env;

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



//ENDPOINTS


//individual user's trips
app.get('/api/userTrips/:user_id', tripCtrl.getUserTrips)

app.get('/api/activities/:trip_id', tripCtrl.getActivities)

app.get('/api/locations/:trip_id', tripCtrl.getLocations)

app.get('/api/trip-photos/:trip_id', tripCtrl.getPhotos)

app.get('/api/budget/:trip_id', tripCtrl.getBudget)

