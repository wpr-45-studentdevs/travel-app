select user_id, user_email, user_display_name, user_bio, profile_pic from users
where user_id in (
select distinct friend_id from friends
where user_id = $(user_id)
and friend_id not in(select u.user_id from users u
join trip_bridge tb on tb.user_id = u.user_id
where tb.trip_id = $(trip_id))
)
