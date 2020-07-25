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
    .then(function (answer) {
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

async function viewAllDepts() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
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
async function viewAllRoles() {
  connection.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", async function (err, res) {
    if (err) throw err;
    console.table(res);
    promptStart();
  })
}
// async function viewAllRoles() {("SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id"
// var query = "SELECT * FROM role";
//     connection.query(query, function(err, res) {
//         console.log(`ROLES:`)
//     res.forEach(role => {
//         console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
//     })
//     start();
//     });
async function viewAllEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    ,async function (err, res) {   
    
      
      // "SELECT employee.id, employee.first_name, employee.last_name, role.title AS \"role\", manager.first_name AS \"manager\" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON employee.manager_id = manager.id GROUP BY employee.id"
      // `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id  ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id//////employeeall
  
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
async function addDept() {
  inquirer
    .prompt([{
      type: "input",
      name: "deptName",
      message: "Enter department name:"
    }])
    .then(function (res) {
      console.table(res);
      const query = connection.query(
        "INSERT INTO department SET ?", {
          name: res.deptName
        },
        async function (err, res) {
          if (err) throw err;
          connection.query("SELECT * FROM department", function (err, res) {
            console.table("Department Added");
            promptStart();
          })
        }
      )
    })
}

async function addRole() {
  inquirer.prompt([{

    type: "input",
    name: "title",
    message: "Enter Title:"

  }, {

    type: "number",
    name: "salary",
    message: "Enter Salary:"
  }, {


    type: "input",
    name: "department_id",
    message: "Enter Department ID:"

  }]).then(function (res) {
    connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [res.title, res.salary, res.department_id], function (err, res) {
      if (err) throw err;
      console.table("Role Added");
      promptStart();
    })
  })


}

function addEmployee() {
  inquirer.prompt([{
      type: "input",
      name: "firstName",
      message: "Employee First Name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee Last Name?"
    },
    {
      type: "number",
      name: "roleId",
      message: "Employee role ID"
    },
    {
      type: "number",
      name: "managerId",
      message: "Employees manager ID?"
    }
  ]).then(function (res) {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
      if (err) throw err;
      console.table("Employee Added");
      promptStart();
    })
  })
}
async function updateEmployeeRole() {
  inquirer.prompt([
      {
          message: "Which employee's role would you like to update?",
          type: "input",
          name: "name"
      }, {
          message: "Enter the new role ID:",
          type: "number",
          name: "role_id"
      }
  ]).then(function (res) {
      connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.role_id, res.name], function (err, res) {
        if (err) throw err;  
        console.table("Role Updated");
      })
      promptStart();
  })

}