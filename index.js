const inquirer = require("inquirer");
let Database = require("./async-db");
let mysql = require("mysql");

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Shifting Shadows",
    database: "cms"
  });
  
/*
  Start of calls to the database 
*/
function getManagers() {
    return [
        "manager 1",
        "manager 2",
        "manager 3",
        "manager 4",
        "manager 5"
    ];

}

function getRoles() {
    return [
        "role 1",
        "role 2",
        "role 3",
        "role 4",
        "role 5"
    ];
}

async function getEmployeeNames() {
    let query = "SELECT * FROM employee";

    const rows = await db.query(query);
    console.log(`Retrieved ${rows.length}`, rows);

    let employeeNames = [];
    for(const employee of employees) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function viewAllRoles() {
    console.log("view all roles");
    // SELECT * FROM role;
    let query = "SELECT * FROM role";

    const rows = await db.query(query);
    console.log(`Retrieved ${rows.length}`, rows);

    return rows;
}

async function viewAllEmployees() {
    console.log("view all employees");
    // SELECT * FROM employee;
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.log(`Retrieved ${rows.length}`, rows);
}

async function viewAllEmployeesByDepartment() {
    // View all employees by department
    // SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);
    console.log("view all employees by department");
    let query = "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.log(`Retrieved ${rows.length}`, rows);

}

async function viewAllEmployeesByManager() {
    console.log("view all employees by manager");


}

async function updateEmployee(employeeInfo) {
    console.log(`updateEmployee with info: ${employeeInfo}`);

}

async function addEmployee(employeeInfo) {
    console.log(`addEmployee with info: ${employeeInfo}`);
    // INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Hope", 8, 5);

}

async function removeEmployee(employeeInfo) {
    console.log(`removeEmployee with info: ${employeeInfo}`);
    // DELETE from employee WHERE first_name="Cyrus" AND last_name="Smith";
}

/* 
End of calls to the database
*/

async function mainPrompt() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                  "View all employees",
                  "View all employees by department",
 //                 "View all employees by manager",
                  "Add department",
                  "Add employee",
                  "Add role",
//                  "Update employee info",
//                  "Remove employee",
                  "Update employee role",
//                  "Update employee manager",
                  "View all roles",
                  "Exit"
                ]
            }
        ])
}

async function getEmployeeInfo() {
    const managers = await getManagers();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "action",
                choices: [
                    // populate from db
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "action",
                choices: [
                    // populate from db
                    ...managers
                ]
            }
        ])
}

async function getUpdateEmployeeInfo() {
    const employees = getEmployeeNames();
    const managers = await getManagers();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "action",
                choices: [
                    // populate from db
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "action",
                choices: [
                    // populate from db
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "action",
                choices: [
                    // populate from db
                    ...managers
                ]
            }
        ])

}

async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Which employee do you want to remove?",
            name: "action",
            choices: [
                // populate from db
                ...employees
            ]
        }
    ])
}

async function getUpdateEmployeeRoleInfo() {
    const employees = getEmployeeNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "action",
                choices: [
                    // populate from db
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "action",
                choices: [
                    // populate from db
                    ...roles
                ]
            }
        ])

}

async function getUpdateEmployeeManagerInfo() {
    const employees = getEmployeeNames();
    const managers = await getManagers();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "action",
                choices: [
                    // populate from db
                    ...employees
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "action",
                choices: [
                    // populate from db
                    ...managers
                ]
            }
        ])

}

async function main() {
    let exitLoop = false;
    while(!exitLoop) {
        const prompt = await mainPrompt();

        switch(prompt.action) {
            case 'View all employees': {
                await viewAllEmployees();
                break;
            }

            case 'View all employees by department': {
                await viewAllEmployeesByDepartment();
                break;
            }

            case 'View all employees by manager': {
                await viewAllEmployeesByManager();
                break;
            }

            case 'Add employee': {
                const newEmployee = await getEmployeeInfo();
                await addEmployee(newEmployee);
                break;
            }

            case 'Update employee info': {
                const employee = await getUpdateEmployeeInfo();
                await updateEmployee(employee);
                break;
            }

            case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;
            }
            
            case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await updateEmployee(employee);
                break;
            }

            case 'Update employee manager': {
                const employee = await getUpdateEmployeeManagerInfo();
                await updateEmployee(employee);
                break;
            }

            case 'View all roles':
                await viewAllRoles();
                break;

            case 'Exit':
                exitLoop = true;
                break;

            default:
                console.log(`Internal warning. Shouldn't get here. action was ${prompt.action}`);
        }
    }
}

main();
