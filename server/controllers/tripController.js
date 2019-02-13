module.exports = {
  getUserTrips: async (req,res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    const trips = await db.get_user_trip_names({user_id})
    res.status(200).send(trips)
  },
  getActivities: async (req,res) => {
    const db = req.app.get('db')
    const {trip_id} = req.params
    const activities = await db.get_activities({trip_id})
    res.status(200).send(activities)
  },
  getLocations: async (req,res) => {
    const db = req.app.get('db')
    const {trip_id} = req.params
    const locations = await db.get_locations({trip_id})    
    res.status(200).send(locations)
  },
  getPhotos: async (req, res) => {
    const db = req.app.get('db')
    const {trip_id} = req.params
    const photos = await db.get_photos({trip_id})
    res.status(200).send(photos)
  },
  getBudget: async (req,res) => {
    const db = req.app.get('db')
    const {trip_id} = req.params
    const budget = await db.get_budget({trip_id})
    res.status(200).send(budget)
  }
}