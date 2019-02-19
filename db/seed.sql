CREATE TABLE activities (
   activity_id SERIAL PRIMARY KEY,
   activity_name character varying(20) NOT NULL,
   trip_id integer REFERENCES trips(trip_id)
);

CREATE TABLE bucket_list (
   bucket_list_id SERIAL PRIMARY KEY,
   title character varying(100) NOT NULL,
   user_id integer NOT NULL REFERENCES users(user_id),
   completed boolean NOT NULL
);

CREATE TABLE budget (
   budget_item_id integer DEFAULT nextval('budget_id_seq'::regclass) PRIMARY KEY,
   item_name character varying(50),
   item_cost integer,
   trip_id integer REFERENCES trips(trip_id)
);

CREATE TABLE friends (
   friendship_id SERIAL PRIMARY KEY,
   user_id integer REFERENCES users(user_id),
   friend_id integer REFERENCES users(user_id)
);

CREATE TABLE location (
   location_id SERIAL PRIMARY KEY,
   location_name character varying(30) NOT NULL,
   trip_id integer REFERENCES trips(trip_id)
);

CREATE TABLE photo (
   photo_id SERIAL PRIMARY KEY,
   photo_url text,
   trip_id integer REFERENCES trips(trip_id)
);

CREATE TABLE trip_bridge (
   tb_id SERIAL PRIMARY KEY,
   trip_id integer REFERENCES trips(trip_id),
   user_id integer REFERENCES users(user_id)
);

CREATE TABLE trips (
   trip_id integer DEFAULT nextval('trip_trip_id_seq'::regclass) PRIMARY KEY,
   trip_name character varying(20) NOT NULL,
   date character varying(50),
   completed boolean NOT NULL,
   public boolean NOT NULL,
   trip_length integer,
   trip_notes text
);

CREATE TABLE users (
   user_id integer DEFAULT nextval('users_id_seq'::regclass) PRIMARY KEY,
   user_email character varying(50) NOT NULL,
   hash text NOT NULL,
   user_display_name character varying(20) NOT NULL,
   user_bio character varying(200),
   profile_pic text
);
