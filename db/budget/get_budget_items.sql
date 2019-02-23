SELECT * FROM budget 
WHERE trip_id = ${trip_id}
ORDER BY budget_item_id ASC;