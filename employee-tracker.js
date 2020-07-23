const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_DB"
});

connection.connect(function (err) {
    if (err) throw err;
  
    promptStart();
  });

  function promptStart() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Departments":
          viewAllDepts();
          break;
  
        case "View All Roles":
          viewAllRoles();
          break;
  
        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
            updateEmployeeRole();
                  break;
        }
      });
  }

   async function viewAllDepts(){
    connection.query ("SELECT * FROM department", function(err, res){
      console.table(res);
      promptStart();
    })
    }
  // async function viewAllDepts() {
  //   var query = "SELECT * FROM department";
  //     connection.query(query, function(err, res) {
  //         console.log(`DEPARTMENTS:`)
  //       res.forEach(department => {
  //           console.log(`ID: ${department.id} | Name: ${department.name}`)
  //       })
  //       start();
  //       });
  //   };
   async function viewAllRoles(){
     connection.query("SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id", async function (err,res){
      if (err) throw err;
      console.table(res);
      promptStart();
    })}
    // async function viewAllRoles() {
    // var query = "SELECT * FROM role";
    //     connection.query(query, function(err, res) {
    //         console.log(`ROLES:`)
    //     res.forEach(role => {
    //         console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
    //     })
    //     start();
    //     });
    async function viewAllEmployees() {
      connection.query("SELECT employee.first_name, employee.last_name, role.title AS \"role\", manager.first_name AS \"manager\" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON employee.manager_id = manager.id GROUP BY employee.id",  
      async function(err, res) {
          if (err) throw err;
        
          console.table(res);
          promptStart();
        });
      }
      // async function viewAllEmployeesByManager(managerId) {
      //   return this.connection.query(
      //     "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      //     managerId
      //   );
      // }
  

    