DELETE FROM photo WHERE trip_id = ${trip_id}
RETURNING *;