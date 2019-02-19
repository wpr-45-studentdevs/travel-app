INSERT INTO trips (trip_notes)
VALUES ${trip_notes}
WHERE trip_id = ${trip_id}
RETURNING *;