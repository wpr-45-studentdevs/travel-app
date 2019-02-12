module.exports = {
    getBucketList: async (req, res) => {
        const {user_id} = req.session.user;
        const db = req.app.get('db');

        const bucketList = await db.get_bucket_list({user_id});
        res.status(200).send(bucketList);
    }
}