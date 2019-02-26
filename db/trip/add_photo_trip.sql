insert into photo (photo_url, trip_id)
values(${photo_url}, ${trip_id})
returning *;