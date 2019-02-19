DELETE FROM location
WHERE location_id = ${location_id}
RETURNING *;


