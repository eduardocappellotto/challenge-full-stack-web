-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL,
    deletedAt TIMESTAMP WITH TIME ZONE
);

-- Create students table with RA as the primary key
CREATE TABLE IF NOT EXISTS students (
    ra VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    deletedAt TIMESTAMP WITH TIME ZONE
);


-- Insert mock data into users table
INSERT INTO users (username, password, user_type) VALUES
('ademir', '$2a$12$xwvSn7PLtd2gHMEAY6pY8ecqnNlu6Rkhlmud0Nj/AgZQmY73fSc2m', 'admin'),
('estudancio', '$2a$12$79StfjvsarE.LvMB0sTQLO9UYPQOngIqNB/VX.W6lgMZXcSkBaxc2', 'user');

-- Insert mock data into students table
INSERT INTO students (name, email, ra, cpf) VALUES
('John Doe', 'john@example.com', '123456', '123.456.789-00'),
('Jane Smith', 'jane@example.com', '789012', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '654321', '654.321.987-00'),
('Emily Brown', 'emily@example.com', '987654', '987.654.123-00'),
('John Doe', 'john@example.com', '12345782', '123.456.789-00'),
('Jane Smith', 'jane@example.com', '87667876', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '6786786', '654.321.987-00'),
('Emily Brown', 'emily@example.com', '456756', '987.654.123-00'),
('John Doe', 'john@example.com', '2344234324', '123.456.789-00'),
('Jane Smith', 'jane@example.com', '54564565', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '2344111', '654.321.987-00'),
('Jane Smith', 'jane@example.com', '2342343224', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '23431431231', '654.321.987-00'),
('Emily Brown', 'emily@example.com', '131231311', '987.654.123-00'),
('John Doe', 'john@example.com', '5345435', '123.456.789-00'),
('Jane Smith', 'jane@example.com', '654645456', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '12312311', '654.321.987-00'),
('John Doe', 'john@example.com', '78989089', '123.456.789-00'),
('Jane Smith', 'jane@example.com', '789789789', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '86788678', '654.321.987-00'),
('Jane Smith', 'jane@example.com', '78969696', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '5785788', '654.321.987-00'),
('Emily Brown', 'emily@example.com', '56756758', '987.654.123-00'),
('John Doe', 'john@example.com', '97897899', '123.456.789-00'),
('Jane Smith', 'jane@example.com', '6786885658', '987.654.321-00'),
('Michael Johnson', 'michael@example.com', '47757567', '654.321.987-00'),
('Emily Brown', 'emily@example.com', '4564563663', '987.654.123-00');