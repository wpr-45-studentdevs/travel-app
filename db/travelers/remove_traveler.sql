-- DELETE FROM trip_bridge
-- WHERE user_id = $(user_id) and trip_id = $(trip_id)
-- returning *;

DELETE FROM trip_bridge
WHERE tb_id = $(tb_id)
returning *;