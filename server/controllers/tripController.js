module.exports = {
  getAllPublicTrips: async (req, res) => {
    const db = req.app.get("db");
    db.get_all_public_trips().then(publicTrips =>
      res.status(200).send(publicTrips)
    );
  }
};
