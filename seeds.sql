-- Drop the employeeDB if it already exists
DROP DATABASE IF EXISTS employeeDB;

-- Create the DB "employeeDB" (only works on local connections)
CREATE DATABASE employeeDB;

-- Use the DB employeeDB for all the rest of the script
USE employeeDB;

-- Create the table "employeeTable"
CREATE TABLE employeeTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT
);

-- Create the table "roleTable"
CREATE TABLE roleTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT
);

-- Create the table "departmentTable"
CREATE TABLE departmentTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
