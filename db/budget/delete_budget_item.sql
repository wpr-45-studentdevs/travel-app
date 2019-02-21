DELETE FROM budget
WHERE budget_item_id = ${budget_item_id}
RETURNING *;