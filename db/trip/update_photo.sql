update photo
set photo_url = ${photo_url}
where trip_id = ${trip_id}
returning *