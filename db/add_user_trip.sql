insert into trips (trip_name, date, completed, public, trip_length)
values(${trip_name}, ${date}, ${completed}, ${public}, ${trip_length})
returning *;

