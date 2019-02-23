UPDATE budget
SET item_name = ${item_name}, item_cost = ${item_cost}
WHERE budget_item_id = ${budget_item_id}
RETURNING *;