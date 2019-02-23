module.exports = {
   addNotes: async (req, res) => {
      const db = req.app.get('db');
      const { trip_id, trip_notes } = req.body;
      const notes = await db.notes.add_notes({ trip_id, trip_notes })
      res.status(200).send(notes)
   },
}