UPDATE bucket_list
SET title = ${title},
completed = ${completed}
WHERE bucket_list_id = ${bucket_list_id}
RETURNING *;