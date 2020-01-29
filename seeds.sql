-- Drop the employeeDB if it already exists
DROP DATABASE IF EXISTS employeeDB;

-- Create the DB "employeeDB" (only works on local connections)
CREATE DATABASE employeeDB;

-- Use the DB employeeDB for all the rest of the script
USE employeeDB;

-- Create the table "employeeTable"
CREATE TABLE employeeTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  role_id INT,
  manager_id INT
);

-- Create the table "roleTable"
CREATE TABLE roleTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL,
  department_id INT
);

-- Create the table "departmentTable"
CREATE TABLE departmentTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Create a few departments to start with
INSERT INTO departmentTable (name)
VALUES ("Department of Magical Law Enforcement"), ("Department of Mysteries"), ("Department of Magical Transportation");

-- INSERT INTO departmentTable (name)
-- VALUES ("Department of Mysteries");

-- INSERT INTO departmentTable (name)
-- VALUES ("Department of Magical Transportation");
