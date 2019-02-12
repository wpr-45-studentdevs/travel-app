INSERT INTO users(user_email, hash, user_display_name, user_bio )
VALUES(${email}, ${hash}, ${displayName}, ${bio})

RETURNING *; 
-- Returning is immediately giving us back what was inserted into table. 