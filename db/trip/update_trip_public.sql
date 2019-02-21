UPDATE trips
SET public = ${public}
WHERE trip_id = ${trip_id}
RETURNING  *;
