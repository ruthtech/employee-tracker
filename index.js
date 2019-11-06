const inquirer = require("inquirer");
let Database = require("./async-db");
let mysql = require("mysql");
let cTable = require("console.table");

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
async function getManagerNames() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";

    const rows = await db.query(query);
    //console.log("number of rows returned " + rows.length);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function getRoles() {
    let query = "SELECT title FROM role";
    const rows = await db.query(query);
    //console.log("Number of rows returned: " + rows.length);

    let roles = [];
    for(const row of rows) {
        roles.push(row.title);
    }

    return roles;
}

// need to find the role.id of the named role
async function getRoleId(roleName) {

}

// need to find the employee.id of the named manager
function getEmployeeId(fullName) {
    // First split the name into first name and last name
    let employeeName = fullName.split(" ");

}

/*
RowDataPacket {
    id: 14,
    first_name: 'Cyrus',
    last_name: 'Smith',
    role_id: 4,
    manager_id: 3
  }
*/
async function getEmployeeNames() {
    let query = "SELECT * FROM employee";

    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function viewAllRoles() {
    console.log("");
    // SELECT * FROM role;
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}

async function viewAllEmployees() {
    console.log("");

    // SELECT * FROM employee;
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.table(rows);
}

async function viewAllEmployeesByDepartment() {
    // View all employees by department
    // SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);
    console.log("");
    let query = "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.table(rows);
}

async function viewAllEmployeesByManager() {
    console.log("view all employees by manager");


}

async function updateEmployeeRole(employeeInfo) {
    console.log(`updateEmployeeRole with info: ${employeeInfo}`);

}

async function addDepartment(departmentInfo) {

}

async function addEmployee(employeeInfo) {
    console.log(`addEmployee with info: ${employeeInfo}`);
    console.log(`${employeeInfo}`);
    
    // TODO need to find the role.id of the named role
    // TODO need to find the employee.id of the named manager

    // INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Hope", 8, 5);
    let query = "INSERT into employee (first_name, last_name, role, manager_id) VALUES ?";
    let args = [employeeInfo.first_name, employeeInfo.last_name, employeeInfo.role_id, manager];
//    const rows = await db.query(query, args);
//    console.table(rows);
    console.log(args);
}

async function removeEmployee(employeeInfo) {
    const employeeName = employeeInfo.employeeName.split(" ");
    console.log(`removeEmployee with info: ${employeeName[0]} ${employeeName[1]}`);
    // DELETE from employee WHERE first_name="Cyrus" AND last_name="Smith";
    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await db.query(query, args);
}

async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`added department named ${departmentName}`);
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
                  "Add department",
                  "Add employee",
                  "Add role",
                  "Remove employee",
                  "Update employee role",
                  "View all employees",
                  "View all employees by department",
                  "View all roles",
 //                 "View all employees by manager",
//                  "Update employee info",
//                  "Update employee manager",
                  "Exit"
                ]
            }
        ])
}

async function getAddEmployeeInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    // populate from db
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: [
                    // populate from db
                    ...managers
                ]
            }
        ])
}

async function getUpdateEmployeeInfo() {
    const employees = getEmployeeNames();
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "employeeName",
                choices: [
                    // populate from db
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    // populate from db
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
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
            name: "employeeName",
            choices: [
                // populate from db
                ...employees
            ]
        }
    ])
}

async function getDepartmentInfo() {
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
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
                name: "employeeName",
                choices: [
                    // populate from db
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    // populate from db
                    ...roles
                ]
            }
        ])

}

async function getUpdateEmployeeManagerInfo() {
    const employees = getEmployeeNames();
    const managers = await getManagerNames();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "employeeName",
                choices: [
                    // populate from db
                    ...employees
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "managerName",
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
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }

            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addEmployee(newRole);
                break;
            }

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
                await updateEmployeeRole(employee);
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
                return;

            default:
                console.log(`Internal warning. Shouldn't get here. action was ${prompt.action}`);
        }
    }
}

console.log("here");
main();

// async function test() {
//      const employees = await getManagerNames();
//      console.log(employees);
// }
// test();
