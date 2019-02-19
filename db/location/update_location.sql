UPDATE location
SET location_name = ${location_name}
WHERE location_id = ${location_id}
RETURNING *;