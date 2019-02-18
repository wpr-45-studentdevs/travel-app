insert into trip_bridge (trip_id, user_id)
values (${trip_id}, ${user_id})
returning *