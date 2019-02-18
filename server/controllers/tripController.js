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
    const trips = await db.get_user_trip_names({ user_id });
    res.status(200).send(trips);
  },
  getActivities: async (req, res) => {
    const db = req.app.get("db");
    const { trip_id } = req.params;
    const activities = await db.get_activities({ trip_id });
    res.status(200).send(activities);
  },
  getLocations: async (req, res) => {
    const db = req.app.get("db");
    const { trip_id } = req.params;
    const locations = await db.get_locations({ trip_id });
    res.status(200).send(locations);
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

  addTrips: async (req, res) => {
    const db = req.app.get("db");
    const { tripName, date, completed, public, tripLength } = req.body;
    const tripArray = await db.add_user_trip({
      trip_name: tripName,
      date: date,
      completed: completed,
      public: public,
      trip_length: tripLength
    });
    if (tripArray) {
      res.status(200).send(tripArray);
    } else {
      return res.status(500).send("user id screwed up");
    }
  },

  addTripToUser: async (req, res) => {
    const db = req.app.get("db");
    const userId = 11;
    const userTrip = await db.user_to_trip({
      trip_id: tripID,
      user_id: userId
    });
  }
};
