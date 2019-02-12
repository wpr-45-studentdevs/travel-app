const bcrypt = require('bcryptjs');

module.exports = {
   register: async (req, res) => {
      const { email, password, displayName, bio } = req.body;
      const db = req.app.get('db');

      const userArray = await db.find_user({ email });
      if(userArray.length >= 1) {
         return res.status(200).send({ message: 'A user with this email already exists. Please enter a different email.', loggedIn: false })
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt)

      const newUser = await db.create_user({ email, hash, displayName, bio });
      req.session.user = { user_id: newUser[0].user_id, user_email: newUser[0].user_email, user_display_name: newUser[0].user_display_name, user_bio: newUser[0].user_email };
      res.status(200).send({ message: 'New user created and logged in', userData: req.session.user, loggedIn: true })
   },
   
   login: async (req, res) => {
      const { email, password } = req.body;
      const db = req.app.get('db');

      const userArray = await db.find_user({ email });
      if(!userArray[0]) {
         return res.status(401).send({ message: 'User not found.' })
      }
      const match = bcrypt.compareSync(password, userArray[0].hash);
      if(!match) {
         return res.status(401).send({ message: 'Incorrect password' })
      }
      req.session.user = { user_id: userArray[0].user_id, user_email: userArray[0].user_email, user_display_name: userArray[0].user_display_name, user_bio: userArray[0].user_email };
      res.status(200).send({ message: `${req.session.user.user_display_name} is logged in`, userData: req.session.user, loggedIn: true })
   },

   userData: async (req, res) => {
      if(req.session.user) {
         res.status(200).send(req.session.user)
      } else {
         res.status(401).send('Please log in')
      }
   },

   logout: async (req, res) => {
      req.session.destroy();
      res.status(200).send({message: 'User logged out.'})
   },

}