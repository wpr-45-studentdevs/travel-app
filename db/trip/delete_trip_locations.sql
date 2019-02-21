DELETE FROM location WHERE trip_id = ${trip_id}
RETURNING *;