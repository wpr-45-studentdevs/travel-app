UPDATE trip_bridge
SET user_id= {user_id}
WHERE tb_id= {tb_id}
RETURNING *;