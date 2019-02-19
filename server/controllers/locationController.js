module.exports = {
    getLocations: async (req, res) => {
        const db = req.app.get("db");
        const { trip_id } = req.params;
        const locations = await db.location.get_locations({ trip_id });
        res.status(200).send(locations);
    },

    addLocation: async (req, res) => {
        const db = req.app.get('db');
        const { trip_id } = req.params;
        const { location_name } = req.body;
        const addedLocation = await db.location.add_location({ location_name, trip_id });

        res.status(200).send(addedLocation);
    },

    editLocation: async (req, res) => {
        const db = req.app.get('db');
        const { location_id } = req.params;
        const { location_name } = req.body;
        const updatedLocation = await db.location.update_location({ location_name, location_id });

        res.status(200).send(updatedLocation);
    },

    deleteLocation: async (req, res) => {
        const db = req.app.get('db');
        const { location_id } = req.params;
        const deletedLocation = await db.location.delete_location({ location_id });

        if (deletedLocation.length < 1) {
            res.status(400).send({ message: `Could not find location with location id of ${location_id}`});
        }
        res.status(200).send(deletedLocation);
    }
}
