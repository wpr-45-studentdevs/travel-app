insert into friends (user_id, friend_id)
values ($(user_id),$(friend_id)), ($(friend_id),$(user_id))
returning *