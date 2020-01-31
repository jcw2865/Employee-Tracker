require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

// Sets an initial port. We'll use this later in our listener
// var PORT = process.env.PORT || 8080;

// Create the server connection
var connection = mysql.createConnection({
    host: "localhost",

    // Establish port
    port: 3306,

    // Username
    user: "root",

    // Password protected using dotenv
    password: process.env.DB_PASSWORD,
    database: "employeeDB"
});

// Connect to the server, run the initial async function.
connection.connect(function (err) {
    if (err) throw err;
    employeeTracker();
});

// Create an async function that will call the rest of the functions based off of the user's choice.
async function employeeTracker() {
    try {
        const userSearch = await askUserForChoice();
        console.log("You chose: " + userSearch);
        if (userSearch === "Add Department") {
            const askDeptName = await askForDepartmentName();
            await addNewDepartment(askDeptName);
        } else if (userSearch === "Add Role") {
            const newRoleInfo = await inquirer.prompt(newRoleQuestions)
            await addNewRole(newRoleInfo);
        } else if (userSearch === "Add Employee") {
            const newEmpInfo = await inquirer.prompt(newEmployeeQuestions)
            await addNewEmployee(newEmpInfo);
        } else if (userSearch === "View Departments") {
            await displayDepts();
        } else if (userSearch === "View Roles") {
            await displayRoles();
        } else if (userSearch === "View Employees") {
            await displayEmployees();
        } else if (userSearch === "Update Employee Role") {
            const updateEmpInfo = await inquirer.prompt(updateEmpQuestions)
            await updateEmployeeRole(updateEmpInfo);
            console.log("Again, you chose Update Employee")
        } else if (userSearch === "Exit") {
            console.log("Thanks for stopping by!");
            connection.end();
        } else {
            console.log("You somehow chose wrong.");
            connection.end();
        }
    } catch (err) {
        console.log(err)
        connection.end();
    }
}

// ===============
// ===============
// ASK USER FOR CHOICE
// ===============
// ===============

function askUserForChoice() {
    return inquirer.prompt([{
        name: "firstQuestion",
        message: "What would you like to do?",
        type: "list",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "Exit"]
    }]).then(response => response.firstQuestion)
};

// ===============
// ===============
// ADD DEPARTMENT
// 1) Ask for dept name, 2) Add dept
// ===============
// ===============

// This function asks the user what they'd like to name their new department and returns their answer.
function askForDepartmentName() {
    return inquirer.prompt([{
        name: "newDepartmentName",
        message: "What would you like to name the new department?",
        type: "input"
    }]).then(function (response) {
        return response.newDepartmentName;
    });
};

// This function takes the user's input from the function askForDepartmentName and creates a new department with it.
// The string askDeptName must be passed into mysql inside of single quotes.
function addNewDepartment(askDeptName) {
    console.log(askDeptName);
    connection.query("INSERT INTO departmentTable (name) VALUE ('" + askDeptName + "')", function (err, result) {
        if (err) throw err;
        console.log("New department created!");
        employeeTracker();
    });
};

// ===============
// ===============
// ADD ROLE
// 1) Ask for role info, 2) Add role
// ===============
// ===============

// This array of questions is asked in the "const newRoleInfo" declaration.

const newRoleQuestions = [
    {
        name: "newRoleTitle",
        message: "What would you like to name the new role?",
        type: "input"
    },
    {
        name: "newRoleSalary",
        message: "What is the salary for the new role? Please enter only numbers.",
        type: "number"
    },
    {
        name: "newDeptId",
        message: "What is the ID of the department for this new role? Please enter only numbers.",
        type: "number"
    }
]

// This function takes the user's input from the inquiry prompt and creates a new role with it.
// The string newRoleInfo must be passed into mysql inside of single quotes.
function addNewRole(newRoleInfo) {
    connection.query("INSERT INTO roleTable (title, salary, department_id) VALUE ('" + newRoleInfo.newRoleTitle + "', '" + newRoleInfo.newRoleSalary + "', '" + newRoleInfo.newDeptId + "')", function (err, result) {
        if (err) throw err;
        console.log("New role created!");
        employeeTracker();
    });
};

// ===============
// ===============
// ADD EMPLOYEE 
// 1) Ask for employee info, 2) Add employee
// ===============
// ===============

// This array of questions is asked in the "const newEmployeeInfo" declaration.

const newEmployeeQuestions = [
    {
        name: "newEmpFirstName",
        message: "What is the employee's first name?",
        type: "input"
    },
    {
        name: "newEmpLastName",
        message: "What is the employee's last name?",
        type: "input"
    },
    {
        name: "empRoleId",
        message: "What is the employee's role ID? Please enter only numbers.",
        type: "number"
    },
    {
        name: "managerId",
        message: "What is the employee's manager's ID? Please enter only numbers.",
        type: "number"
    }
]

// This function takes the user's input from the inquiry prompt and creates a new employee with it.
// The string newEmpInfo must be passed into mysql inside of single quotes.
function addNewEmployee(newEmpInfo) {
    connection.query("INSERT INTO employeeTable (firstName, lastName, role_id, manager_id) VALUE ('" + newEmpInfo.newEmpFirstName + "', '" + newEmpInfo.newEmpLastName + "', '" + newEmpInfo.empRoleId + "', '" + newEmpInfo.managerId + "')", function (err, result) {
        if (err) throw err;
        console.log("New employee created!");
        employeeTracker();
    });
};

// ===============
// ===============
// VIEW DEPARTMENTS 
// 1) Display departments 
// ===============
// ===============

// This function creates a query to display all rows from the departmentTable, then returns to the beginning.
function displayDepts() {
    connection.query("SELECT * FROM departmentTable", function (err, result) {
        if (err) throw err;
        console.table(result);
        employeeTracker();
    });
};

// ===============
// ===============
// VIEW ROLES 
// 1) Display roles 
// ===============
// ===============

// This function creates a query to display all rows from the roleTable, then returns to the beginning.
function displayRoles() {
    connection.query("SELECT * FROM roleTable", function (err, result) {
        if (err) throw err;
        console.table(result);
        employeeTracker();
    });
};

// ===============
// ===============
// VIEW EMPLOYEES 
// 1) Display employees 
// ===============
// ===============

// This function creates a query to display all rows from the employeeTable, then returns to the beginning.
function displayEmployees() {
    connection.query("SELECT * FROM employeeTable", function (err, result) {
        if (err) throw err;
        console.table(result);
        employeeTracker();
    });
};


// ===============
// ===============
// UPDATE EMPLOYEE ROLE
// 1) Ask for employee ID, 2) Update employee
// ===============
// ===============

// This array of questions is asked in the "const updateEmpInfo" declaration.
const updateEmpQuestions = [
    {
        name: "empId",
        message: "What is the ID of the employee you'd like to update? Please enter only numbers.",
        type: "number"
    },
    {
        name: "newRoleId",
        message: "What is the role ID you'd like to give this employee? Please enter only numbers.",
        type: "number"
    }
]

// This function takes the user's input from the inquirer prompt updateEmpQuestions and update's the employee's role in the database
function updateEmployeeRole(updateEmpInfo) {
    connection.query("UPDATE employeeTable SET role_ID=? WHERE id=?", [updateEmpInfo.newRoleId, updateEmpInfo.empId], function (err, result) {
        if (err) throw err;
        console.log("Employee role updated!");
        employeeTracker();
    });
};
