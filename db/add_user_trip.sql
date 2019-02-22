insert into trips (trip_name, date, completed, public, trip_length, trip_owner)
values(${trip_name}, ${date}, ${completed}, ${public}, ${trip_length}, ${trip_owner})
returning *;

