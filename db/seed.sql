USE cms;

INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Bob");
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales person", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("Bob Manager", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Artist Bob", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Musician Bob", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Comedian Bob", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Counselor", 80000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John H.", "Patterson", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mary Kay", "Ash", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Dale", "Carnegie", 2, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Montgomery", "Scott", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Angus", "MacGyver", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kaylee", "Frye", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Cyrus", "Smith", 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "The-Minion", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Ross", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Marley", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Dylan", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Hope", 8, 5);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Deanna", "Troi", 9, null);
