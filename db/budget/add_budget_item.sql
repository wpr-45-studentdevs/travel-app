INSERT INTO budget (item_name, item_cost, trip_id)
VALUES (${item_name}, ${item_cost}, ${trip_id})
RETURNING *;