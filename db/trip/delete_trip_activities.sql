DELETE FROM activities WHERE trip_id = ${trip_id}
RETURNING *;