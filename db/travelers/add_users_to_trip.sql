INSERT INTO trip_bridge(trip_id, user_id)
VALUES($(trip_id), $(user_id)) 
RETURNING *;