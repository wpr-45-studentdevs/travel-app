require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authController = require('./controllers/authController');

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
app.post('/auth/register', authController.register) //register
app.post('/auth/login', authController.login) //login
app.get('/auth/logout', authController.logout) //logout

//ENDPOINTS
