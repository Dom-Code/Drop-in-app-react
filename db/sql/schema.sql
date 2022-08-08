CREATE TABLE providers (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  specialty varchar(50) NOT NULL,
  city varchar(100) NOT NULL, 
  phone_number text NOT NULL,
  average_app_time varchar(100),
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  photo text NOT NUll
);

CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(50) NOT NULL UNIQUE, 
  pw varchar NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE current_users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email varchar(50) NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  refresh_token varchar(200)
);

CREATE TABLE blacklist_refresh_tokens (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  refresh_token varchar(200),
  blacklisted_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);