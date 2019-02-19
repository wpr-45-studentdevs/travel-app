INSERT INTO location(location_name, trip_id)
VALUES(${location_name}, ${trip_id})
RETURNING *;