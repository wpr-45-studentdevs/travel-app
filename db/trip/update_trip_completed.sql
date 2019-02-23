UPDATE trips
SET completed = ${completed}
WHERE trip_id = ${trip_id}
RETURNING *;