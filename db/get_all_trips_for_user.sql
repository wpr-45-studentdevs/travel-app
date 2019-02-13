SELECT * FROM trips
INNER JOIN trip_bridge
	ON trip_bridge.user_id = trips.trip_id
INNER JOIN users
	ON users.user_id = trip_bridge.trip_id
WHERE users.user_id = 1;



-- SELECT * FROM trips
-- join trip_bridge on trip_bridge.trip_id = trips.trip_id
-- join users on trip_bridge.user_id = users.user_id
-- full outer join location on location.trip_id = trips.trip_id
-- full outer join activities on activities.trip_id = trips.trip_id
-- full outer join photo on photo.trip_id = trips.trip_id
-- full outer join budget on budget.trip_id = trips.trip_id
-- where users.user_id = $(user_id)