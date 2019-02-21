select friendship_id from friends
where $(user_id) in (friend_id, user_id)
and $(friend_id) in(friend_id, user_id)