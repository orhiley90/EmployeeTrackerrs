DROP DATABASE IF EXISTS employee_tracker_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	PRIMARY KEY (id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
	salary DECIMAL NOT NULL,
    department_id INT ,    
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES role(id)
);