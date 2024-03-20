-- Insert sample departments
INSERT INTO departments (name) VALUES
('Engineering'),
('Sales'),
('Marketing');

-- Insert sample roles
INSERT INTO roles (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Sales Manager', 100000, 2),
('Marketing Coordinator', 60000, 3);

-- Insert sample employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Alice', 'Smith', 2, 1),
('Bob', 'Johnson', 3, 2);
