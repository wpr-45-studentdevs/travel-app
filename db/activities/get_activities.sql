SELECT * FROM activities
WHERE trip_id = $(trip_id)
ORDER BY activity_id;