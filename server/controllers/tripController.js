module.exports = {
  getAllPublicTrips: async (req, res) => {
    const db = req.app.get("db");
    db.get_all_public_trips().then(publicTrips =>
      res.status(200).send(publicTrips)
    );
  },

  getUserTrips: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    const trips = await db.user_trips.get_user_trip_names({ user_id });
    res.status(200).send(trips);
  },
  getCompletedTrips: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params;
    const trips = await db.user_trips.get_completed_user_trips({user_id})
    res.status(200).send(trips)
  },
  getPhotos: async (req, res) => {
    const db = req.app.get("db");
    const { trip_id } = req.params;
    const photos = await db.get_photos({ trip_id });
    res.status(200).send(photos);
  },
  getBudget: async (req, res) => {
    const db = req.app.get("db");
    const { trip_id } = req.params;
    const budget = await db.get_budget({ trip_id });
    res.status(200).send(budget);
  },
  getTripUsers: async (req, res) => {
    const db = req.app.get("db");
    const { trip_id } = req.params;
    const tripUsers = await db.get_trip_users({ trip_id });
    res.status(200).send(tripUsers);
  
  },
  addTrips: async (req, res) => {
    const db = req.app.get("db");
    const { tripName, date, completed, public, tripLength, trip_owner } = req.body;
    const tripArray = await db.add_user_trip({
      trip_name: tripName,
      date: date,
      completed: completed,
      public: public,
      trip_length: tripLength,
      trip_owner: trip_owner
    });
    if (tripArray) {
      res.status(200).send(tripArray);
    } else {
      return res.status(500).send("user id screwed up");
    }
  },

  addUserToTrip: async (req, res) => {
    const db = req.app.get("db");
    const { trip_id } = req.params;
    const { user_id } = req.session.user;
<<<<<<< HEAD
=======
    // const user_id = 10
    console.log(req.session.user);
>>>>>>> master
    const userTrip = await db.user_to_trip({
      trip_id: trip_id,
      user_id: user_id
    });
    if (userTrip) {
      res.status(201).send(userTrip);
    } else {
      res.status(500).send("no user on this trip");
    }
<<<<<<< HEAD
  },

  deleteTrip: async (req, res) => {
    const db = req.app.get('db');
    const { trip_id } = req.params;
    const deletedActivities = await db.trip.delete_trip_activities({ trip_id });
    const deletedBudget = await db.trip.delete_trip_budget({ trip_id });
    const deletedLocations = await db.trip.delete_trip_locations({ trip_id });
    const deletedPhotos = await db.trip.delete_trip_photos({ trip_id });
    const deletedBridge = await db.trip.delete_trip_bridge({ trip_id });
    const deletedTrip = await db.trip.delete_trip({ trip_id });
    res.status(200).send({ 
      message: 'trip deleted',
      trip: {deletedActivities, deletedBudget, deletedLocations, deletedPhotos, deletedBridge, deletedTrip}
    })
  },

  updateTripPublic: async (req, res) => {
    const db = req.app.get('db');
    const { trip_id, public } = req.body;
    const updatedTripPublic = await db.trip.update_trip_public({ trip_id, public })
    res.status(200).send(updatedTripPublic)
  },

  updateTripCompleted: async (req, res) => {
    const db = req.app.get('db');
    const { trip_id, completed } = req.body;
    const updatedTripCompleted = await db.trip.update_trip_completed({ trip_id, completed });
    res.status(200).send(updatedTripCompleted)
  },
=======
  }
>>>>>>> master
};
