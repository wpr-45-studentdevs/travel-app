SELECT t.trip_id, trip_name, date, completed, public, trip_length, u.user_id, trip_owner FROM trips t
 join trip_bridge on trip_bridge.trip_id = t.trip_id
 join users u on trip_bridge.user_id = u.user_id
<<<<<<< HEAD:db/user_trips/get_completed_user_trips.sql
 where u.user_id = ${user_id} and completed = true
=======
 where u.user_id = ${user_id} and completed = true
>>>>>>> master:db/user_trips/get_completed_user_trips.sql
