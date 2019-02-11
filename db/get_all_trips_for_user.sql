SELECT *
FROM trips
INNER JOIN trip_bridge
	ON trip_bridge.user_id = trips.trip_id
INNER JOIN users
	ON users.user_id = trip_bridge.trip_id
WHERE users.user_id = 1;