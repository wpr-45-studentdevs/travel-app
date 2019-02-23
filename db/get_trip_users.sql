select u.user_id, u.user_display_name, u.profile_pic, tb.trip_id, tb_id as bridge_id  from users u
join trip_bridge tb on tb.user_id = u.user_id
where tb.trip_id = $(trip_id)