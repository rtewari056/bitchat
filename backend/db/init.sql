CREATE DATABASE IF NOT EXISTS node_typescript; -- Create a database named node_typescript

USE node_typescript; -- Use the database to make changes to it

-- Drop tables if already exists
DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  salt VARCHAR(255) NOT NULL,
  password VARCHAR(100) NOT NULL,
  password_reset_code VARCHAR(100) NULL,
  verification_code VARCHAR(100) NULL,
  image varchar(500) NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);