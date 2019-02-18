UPDATE users 
SET user_email = $(user_email),
user_display_name = $(user_display_name),
user_bio = $(user_bio),
profile_pic = $(profile_pic)
WHERE user_id = $(user_id)
RETURNING user_id, user_email, user_display_name, user_bio, profile_pic;
