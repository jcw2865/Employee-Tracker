require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

// // Sets an initial port. We"ll use this later in our listener
// var PORT = process.env.PORT || 8080;

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

connection.connect(function (err) {
    if (err) throw err;
    employeeTracker();
});

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
        } else if (userSearch === "View Department") {
            const viewDept = await inquirer.prompt(whichDept);
            await displayDept(viewDept);
            console.log("Again, you chose View Department")
        } else if (userSearch === "View Role") {
            console.log("Again, you chose View Role")
        } else if (userSearch === "View Employee") {
            console.log("Again, you chose View Employee")
        } else if (userSearch === "Update Employee") {
            console.log("Again, you chose Update Employee")
        } else if (userSearch === "Update Role") {
            console.log("Again, you chose Update Role")
        }
        else if (userSearch === "Exit") {
            console.log("Thanks for stopping by!");
            connection.end();
        }
        else {
            console.log("You somehow chose wrong.");
            connection.end();
        }

    } catch (err) {
        console.log(err)
        connection.end();
    }
}

// Ask user what they want to do
function askUserForChoice() {
    return inquirer.prompt([{
        name: "firstQuestion",
        message: "What would you like to do?",
        type: "list",
        choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Role", "View Employee", "Update Employee", "Update Role", "Exit"]
    }]).then(response => response.firstQuestion)
};

// ===============
// Add departments 
// 1) Ask for dept name, 2) Add dept
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
// Add role 
// 1) Ask for role info, 2) Add role
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

// This function takes the user's input from the function askForRoleName and creates a new role with it.
// The string askRoleName must be passed into mysql inside of single quotes.
function addNewRole(newRoleInfo) {
    connection.query("INSERT INTO roleTable (title, salary, department_id) VALUE ('" + newRoleInfo.newRoleTitle + "', '" + newRoleInfo.newRoleSalary + "', '" + newRoleInfo.newDeptId + "')", function (err, result) {
        if (err) throw err;
        console.log("New role created!");
        employeeTracker();
    });
};

// ===============
// Add employee 
// 1) Ask for employee info, 2) Add employee
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

// This function takes the user's input from the function askForRoleName and creates a new role with it.
// The string askRoleName must be passed into mysql inside of single quotes.
function addNewEmployee(newEmpInfo) {
    connection.query("INSERT INTO employeeTable (firstName, lastName, role_id, manager_id) VALUE ('" + newEmpInfo.newEmpFirstName + "', '" + newEmpInfo.newEmpLastName + "', '" + newEmpInfo.empRoleId + "', '" + newEmpInfo.managerId + "')", function (err, result) {
        if (err) throw err;
        console.log("New employee created!");
        employeeTracker();
    });
};

// ===============
// View Department 
// 1) Ask for department name, 2) Display department info
// ===============

// This array of questions is asked in the "const newEmployeeInfo" declaration.

const newEmployeeQuestions = [
    {
        name: "deptName",
        message: "What would you like to do?",
        type: "list",
        choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Role", "View Employee", "Update Employee", "Update Role", "Exit"]
    }
]

// This function takes the user's input from the function askForRoleName and creates a new role with it.
// The string askRoleName must be passed into mysql inside of single quotes.
function addNewEmployee(newEmpInfo) {
    connection.query("INSERT INTO employeeTable (firstName, lastName, role_id, manager_id) VALUE ('" + newEmpInfo.newEmpFirstName + "', '" + newEmpInfo.newEmpLastName + "', '" + newEmpInfo.empRoleId + "', '" + newEmpInfo.managerId + "')", function (err, result) {
        if (err) throw err;
        console.log("New employee created!");
        employeeTracker();
    });
};


// // View departments 
// function viewDepartments() { };

// // View roles 
// function viewRoles() { };

// // View employees
// function viewEmployees() { };

// // Update employee 
// function updateEmployee() { };

// // Update roles
// function updateRole() { };
