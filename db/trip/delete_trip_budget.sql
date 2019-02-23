DELETE FROM budget WHERE trip_id = ${trip_id}
RETURNING *;