module.exports = {
  addTravelers: async (req,res) => {
    const db = req.app.get('db')
    const {trip_id} = req.params
    const {user_email} = req.body
    const userArr = await db.travelers.find_user_id({user_email})
    const user_id = userArr[0].user_id
    const addedTraveler = await db.travelers.add_users_to_trip({trip_id, user_id})
    res.status(200).send(addedTraveler)
  },
  removeTraveler: async (req,res) => {
    const db = req.app.get('db')
    const {bridge_id: tb_id} = req.params
    const deletedTrav = await db.travelers.remove_traveler({tb_id})
    res.status(200).send(deletedTrav)
  }
}