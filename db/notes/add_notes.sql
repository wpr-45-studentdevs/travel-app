UPDATE trips
SET trip_notes=${trip_notes}
WHERE trip_id=${trip_id}
RETURNING *;
