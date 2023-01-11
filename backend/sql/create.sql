-- Create users table
CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    modification_time DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- create expense table
CREATE TABLE expense (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255),
	description TEXT,
    due VARCHAR(244),
    amount INT,
    pay_to BIGINT,
    paid BOOL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE roommates (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id BIGINT,
    user_id BIGINT
);
