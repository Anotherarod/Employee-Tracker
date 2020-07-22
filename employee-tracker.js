const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeesDB"
});

connection.connect(function (err) {
    if (err) throw err;
  
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
          employeeSearch();
          break;
  
        case "View All Employees By Department":
          employeeByDeptSearch();
          break;
  
        case "View All Employees By Manager":
          employeeByManager();
          break;
  
        case "Add Employee":
          addEmployee();
          break;
  
        case "Remove Employee":
          removeEmployee();
          break;

        case "Add Employee Role":
          employeeRole();
          break;

        case "Add Employee Manager":
          updateEmployeeManager();
          break;
        }
      });
  }