DELETE FROM friends
WHERE $(user_id) in (friend_id, user_id) and $(friend_id) in (friend_id, user_id)
returning * 