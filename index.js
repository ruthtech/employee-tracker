const inquirer = require("inquirer");

/*
  Start of calls to the database 
*/
async function getManagers() {
    return [
        "manager 1",
        "manager 2",
        "manager 3",
        "manager 4",
        "manager 5"
    ];

}

async function getRoles() {
    return [
        "role 1",
        "role 2",
        "role 3",
        "role 4",
        "role 5"
    ];
}

async function getEmployees() {
    return [
        "employee 1",
        "employee 2",
        "employee 3",
        "employee 4",
        "employee 5"
    ];
}

async function viewAllRoles() {

}

async function viewAllEmployees() {

}

async function viewAllEmployeesByDepartment() {

}

async function viewAllEmployeesByManager() {

}

async function updateEmployee(employeeInfo) {

}

async function addEmployee(employeeInfo) {

}

async function removeEmployee(employeeInfo) {

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
                  "View all employees by manager",
                  "Add employee",
                  "Update employee info",
                  "Remove employee",
                  "Update employee role",
                  "Update employee manager",
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
    const employees = getEmployees();
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
    const employees = await getEmployees();
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
    const employees = getEmployees();
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
    const employees = getEmployees();
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
