const mysql = require('mysql');
const inquirer = require('inquirer');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Orlandogh15!',
  database: 'employee_db'
});

// Connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
  startApp();
});

// Function to start the application
function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
  ]).then(answer => {
    // Based on user's choice, call appropriate functions
    switch (answer.option) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      default:
        console.log('Invalid choice.');
        break;
    }
  });
}

// Function to retrieve and display all departments
function viewDepartments() {
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Go back to the main menu
  });
}

// Function to retrieve and display all roles
function viewRoles() {
  connection.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles INNER JOIN departments ON roles.department_id = departments.id', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Go back to the main menu
  });
}

// Function to retrieve and display all employees
function viewEmployees() {
  connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Go back to the main menu
  });
}

// Function to add a new department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:'
    }
  ]).then(answer => {
    connection.query('INSERT INTO departments SET ?', { name: answer.name }, (err, result) => {
      if (err) throw err;
      console.log('Department added successfully!');
      startApp(); // Go back to the main menu
    });
  });
}

// Function to add a new role
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for this role:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for this role:'
    }
  ]).then(answer => {
    connection.query('INSERT INTO roles SET ?', { title: answer.title, salary: answer.salary, department_id: answer.department_id }, (err, result) => {
      if (err) throw err;
      console.log('Role added successfully!');
      startApp(); // Go back to the main menu
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for this employee:'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for this employee:'
    }
  ]).then(answer => {
    connection.query('INSERT INTO employees SET ?', { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role_id, manager_id: answer.manager_id }, (err, result) => {
      if (err) throw err;
      console.log('Employee added successfully!');
      startApp(); 
    });
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee you want to update:'
    },
    {
      type: 'input',
      name: 'new_role_id',
      message: 'Enter the new role ID for this employee:'
    }
  ]).then(answer => {
    connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [answer.new_role_id, answer.employee_id], (err, result) => {
      if (err) throw err;
      console.log('Employee role updated successfully!');
      startApp(); // Go back to the main menu
    });
  });
}

