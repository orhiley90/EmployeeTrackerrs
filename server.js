const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_tracker_DB"
});

// connect to the mysql server and sql database

function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View departments",
                "View roles",
                "View employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee's role",

            ]
        })
        .then(function (answer) {
            if (answer.action === 'Add a department') {
                addDepartment();
            }
            else if (answer.action === 'Add a role') {
                addRole();
            }
            else if (answer.action === 'Add an employee') {
                addEmployee();
            }
            else if (answer.action === 'View all departments') {
                viewDepts();
            }
            else if (answer.action === 'View all roles') {
                viewRoles();
            }
            else if (answer.action === 'View all employees') {
                viewEmployees();
            }
            else if (answer.action === 'Update employee role') {
                updateRole();
            }

        })
}
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "dept",
            message: "What is the name of the new department?",
        })
        .then(function (answer) {
            const query = "INSERT INTO department (name) VALUES ( ? )";
            connection.query(query, answer.dept, function (err, res) {
                console.log(`You have added this department: ${(answer.dept)}.`)
            })
            
            viewDepts();
        })
}

function viewDepts() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        
        console.log(`DEPARTMENTS:`)+
        
        res.forEach(dept => {
            console.log("error");
            console.log(`ID: ${dept.id} | Name: ${dept.name}`)
        })
        start();
    });
};


start();





















app.listen(PORT, function () {
    console.log("App listening on PORT, http://localhost:" + PORT);
});