module.exports = {
  getUserInfo: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    const userInfo = await db.get_user_info({ user_id })
    res.status(200).send(userInfo)
  },

  editUserInfo: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    const { user_email, user_display_name, user_bio, profile_pic } = req.body
    const userInfo = await db.update_user({ user_id, user_email, user_display_name, user_bio, profile_pic })
    res.status(200).send(userInfo)
  },

  getUserFriends: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    const userFriends = await db.get_friends({ user_id })
    res.status(200).send(userFriends)
  },

  addFriend: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    const { user_email } = req.body
    const friendArr = await db.travelers.find_user_id({ user_email })
    if (friendArr[0]) {
      const friend_id = friendArr[0].user_id
      if (friend_id === user_id) {
        res.status(200).send({ message: 'You cannot add yourself as a friend' })
      } else {
        const bridge = await db.friends.find_friend_bridge({ user_id, friend_id })
        if (!bridge[0]) {
          const addedFriend = await db.friends.add_friend({ user_id, friend_id })
          res.status(200).send({ message: 'Friend added', friendshipData: addedFriend, friendAdded: true })
        } else {
          res.status(200).send({ message: 'This user is already your friend' })
        }
      }
    } else {
      res.status(200).send({ message: 'This user has not registered with us' })
    }
  },

  removeFriend: async (req,res) => {
    const db = req.app.get('db')
    const {user_id, friend_id} = req.params
    const deletedFriend = await db.friends.remove_friend({user_id, friend_id})
    res.status(200).send(deletedFriend)
  },

  getFriendsNotOnTrip: async (req, res) => {
    const db = req.app.get('db')
    const {trip_id, user_id} = req.params
    const friends = await db.friends.get_friends_not_on_trip({user_id, trip_id})
    res.status(200).send(friends)
  }
}