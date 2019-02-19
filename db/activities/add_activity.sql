INSERT INTO activities(activity_name, trip_id)
VALUES (${activity_name}, ${trip_id})
RETURNING *;