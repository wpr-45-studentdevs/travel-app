select u.user_id, u.user_email, u.user_display_name, u.user_bio, u.profile_pic from users u
where u.user_id not in (select friend_id from friends
where user_id = 13) and u.user_id != 13

