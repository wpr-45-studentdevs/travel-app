-- select * from friends
-- where $(user_id) in (user_id, friend_id)


select friendship_id, f.user_id, f.friend_id, u.user_display_name, u.profile_pic from friends f
join users u on f.friend_id = u.user_id
where f.user_id = $(user_id)