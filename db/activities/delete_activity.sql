DELETE FROM activities
WHERE activity_id = ${activity_id} 
RETURNING *;