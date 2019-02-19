module.exports = {
  addTravelers: async (req,res) => {
    const db = req.app.get('db')
    const {trip_id} = req.params
    const {user_email} = req.body
    const userArr = await db.travelers.find_user_id({user_email})
    const user_id = userArr[0].user_id
    const bridge = await db.travelers.find_bridge({user_id, trip_id})
    if(!bridge[0]){
      const addedTraveler = await db.travelers.add_users_to_trip({trip_id, user_id})
      res.status(200).send({message: 'Traveler successfully added!', travelerData: addedTraveler, travelerAdded: true})
    } else {
      res.status(200).send({message: 'User is already on this trip.'})
    }
  },
  removeTraveler: async (req,res) => {
    const db = req.app.get('db')
    const {bridge_id: tb_id} = req.params
    const deletedTrav = await db.travelers.remove_traveler({tb_id})
    res.status(200).send(deletedTrav)
  }
}