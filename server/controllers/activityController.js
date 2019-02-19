module.exports = {
    getActivities: async (req, res) => {
        const db = req.app.get("db");
        const { trip_id } = req.params;
        const activities = await db.activities.get_activities({ trip_id });
        res.status(200).send(activities);
    },

    addActivity: async (req, res) => {
        const db = req.app.get('db');
        const { trip_id } = req.params;
        const { activity_name } = req.body;
        const activity = await db.activities.add_activity({ activity_name, trip_id });
        res.status(200).send(activity);
    },

    editActivity: async (req, res) => {
        const db = req.app.get('db');
        const { activity_id } = req.params;
        const { activity_name } = req.body;
        const activity = await db.activities.update_activity({activity_name, activity_id});

        if (activity.length < 1) {
            res.status(400).send({message: 'Could not edit activity'})
        }
        res.status(200).send(activity);
    },

    deleteActivity: async (req, res) => {
        const db = req.app.get('db');
        const {activity_id} = req.params;
        const activity = await db.activities.delete_activity({activity_id});

        if (activity.length < 1) {
            res.status(400).send({message: 'Could not delete activity'});
        }
        res.status(200).send(activity);
    }
}