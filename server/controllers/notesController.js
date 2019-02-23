module.exports = {
   getNotes: async (req, res) => {
      const db = req.app.get('db');
      const { trip_id } = req.params;
      let notes = await db.notes.get_notes({ trip_id });
      res.status(200).send(notes[0]);
   },
   addNotes: async (req, res) => {
      const db = req.app.get('db');
      const { trip_id, trip_notes } = req.body;
      let notes = await db.notes.add_notes({ trip_id, trip_notes });
      res.status(200).send(notes);
   },
}