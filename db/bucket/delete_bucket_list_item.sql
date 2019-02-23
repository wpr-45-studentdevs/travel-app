DELETE FROM bucket_list
WHERE bucket_list_id = ${bucket_list_id}
RETURNING *;