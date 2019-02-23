UPDATE activities
SET activity_name = ${activity_name}
WHERE activity_id = ${activity_id}
RETURNING *;