SELECT user_display_name
FROM users
INNER JOIN trip_bridge
	ON trip_bridge.user_id = users.user_id
INNER JOIN trips
	ON trips.trip_id = trip_bridge.trip_id
WHERE trips.trip_id = 1;