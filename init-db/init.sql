CREATE TABLE IF NOT EXISTS phone_book (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(32) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255),
    second_name VARCHAR(255),
    email VARCHAR(255),
    description TEXT
);
