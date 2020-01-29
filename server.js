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
            await askForDepartmentName();
            // await addNewDepartment();
        } else if (userSearch === "Add Role") {
            console.log("Again, you chose Add Role")
        } else if (userSearch === "Add Employee") {
            console.log("Again, you chose Add Employee")
        } else if (userSearch === "View Department") {
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
        choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Role", "View Employee", "Update Employee", "Update Role"]
    }]).then(response => response.firstQuestion)
};
// ===============
// Add departments 
// ===============

function askForDepartmentName() {
    return inquirer.prompt([{
        name: "newDepartmentName",
        message: "What would you like to name the new department?",
        type: "input"
    }]).then(function (response) {
        console.log(response.newDepartmentName);
    });
};

// function addNewDepartment() {
//     console.log("Made it here");
//     connection.end();
// }

// // Add roles 
// function addRole() { };

// // Add employees
// function addEmployee() { };

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
