-- SELECT * FROM bucket_list
-- WHERE user_id = ${user_id};

SELECT * FROM bucket_list
WHERE user_id = ${user_id}
ORDER BY completed, bucket_list_id;