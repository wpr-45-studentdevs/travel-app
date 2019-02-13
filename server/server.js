require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authController = require('./controllers/authController');
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
app.get('/api/userData', authController.userData) // gets user data off the session to see if they're logged in
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

//ENDPOINTS
