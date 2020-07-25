# employee-tracker-HW-repo
Employee tracker is a command-line application for managing a company's employees using node, inquirer, and MySQL. This is an interface that makesit easy for non-developers to view and interact with information stored in databases.

To complete this assignment I had to design the following database schema containing three tables, below is a wire frame example: 

![](Images/employeetrackertableexample.png)

This command line interface allow employers to organize their employee database and keep their staff, departments, staff ID's and roles in a computer database. Below there will be a series of screenshots of how the app works and general layout followed by a short demo.

First we have a screenshot of how all three tables look within the command line terminal:

![](Images/threetablescreenshot.png)


Next we have a screenshot of the list of company employees and their departments, roles, salaries, and their managers. If they don't have a manager that field returns null:


![](Images/allemployeescreenshot.png)

Lastly, I will showcase a demo, just click on the link below: 

https://drive.google.com/file/d/1cL1rHJbthe9s-MvCqLm_tiUoUcPh1VpE/view

Here are some guidelines to use this interface:

Use the MySQL NPM package to connect to your MySQL database and perform queries. So you must "npm install", this will install all necessary dependencie. 

Then "npm init -y" this installs your package.json file.

Next, "npm install mysql", "npm install express","npm install inquirer", and "npm install console.table".

Console.table, which is an npm package and formats the populated data for the purposes needed.

Use inquirer npm package to interact with the user via the command-line.

To run the: node employee-tracker.js and follow the prompts to run through the program.

Technologies use:

MySQL
https://www.mysql.com/  


Express
https://expressjs.com/


Inquirer
https://www.npmjs.com/package/inquirer