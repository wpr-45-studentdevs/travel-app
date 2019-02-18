module.exports = {
    getBucketList: async (req, res) => {
        const {user_id} = req.session.user;
        const db = req.app.get('db');

        const bucketList = await db.get_bucket_list({user_id});
        res.status(200).send(bucketList);
    },
    addBucketListItem: async (req, res) => {
        const {user_id} = req.session.user;
        const {title, completed} = req.body;
        const db = req.app.get('db');

        const addedItem = await db.add_bucket_list_item({title, user_id, completed});
        // const bucketList = await db.get_bucket_list({user_id});
        res.status(200).send(addedItem);
    },
    updateBucketListItem: async (req, res) => {
        const {bucket_list_id} = req.params;
        const {title, completed} = req.body;
        const db = req.app.get('db');

        const item = await db.find_bucket_list_item({bucket_list_id});
        if (item.length === 0) {
            res.status(404).send({message: 'Could not find bucket list item'})
        }
        const updatedItem = await db.update_bucket_list_item({title, completed, bucket_list_id});
        res.status(200).send(updatedItem);
    },
    deleteBucketListItem: async (req, res) => {
        const {bucket_list_id} = req.params;
        const db = req.app.get('db');

        const item = await db.find_bucket_list_item({bucket_list_id});
        if (item.length === 0) {
            res.status(404).send({message: 'Could not find bucket list item'});   
        }
        const deletedItem = await db.delete_bucket_list_item({bucket_list_id});
        res.status(200).send(deletedItem);
    }
}