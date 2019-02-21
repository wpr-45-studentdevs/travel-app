DELETE FROM trip_bridge WHERE trip_id = ${trip_id}
RETURNING *;