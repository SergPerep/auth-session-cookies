
-- Create database
CREATE DATABASE auth_session_cookies;

-- Connect to database
\c auth_session_cookies;

-- Users schema
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NUll,
    password VARCHAR(255) NOT NULL
);

-- Add new user (Signup)
INSERT INTO
    users (name, email, password)
VALUES
    (
        'Anna',
        'anna@example.com',
        'blakgsfbhk-fwkbafe-aebfhklb7623'
    );