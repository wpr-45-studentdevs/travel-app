module.exports = {
  getUserInfo: async (req,res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    const userInfo = await db.get_user_info({user_id})
    res.status(200).send(userInfo)
  },

  editUserInfo: async (req,res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    const {user_email, user_display_name, user_bio, profile_pic} = req.body
    const userInfo = await db.update_user({user_id, user_email, user_display_name, user_bio, profile_pic})
    res.status(200).send(userInfo)
  },

  getUserFriends: async (req,res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    const userFriends = await db.get_friends({user_id})
    res.status(200).send(userFriends)
  }
}