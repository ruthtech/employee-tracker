INSERT into department (name) VALUES ("sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Bob");
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 0);
INSERT into role (title, salary, department_id) VALUES ("Sales person", 50000, 0);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 900000, 1);
INSERT into role (title, salary, department_id) VALUES ("Bob Manager", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Artist Bob", 30000, 2);
INSERT into role (title, salary, department_id) VALUES ("Musician Bob", 30000, 2);
INSERT into role (title, salary, department_id) VALUES ("Comedian Bob", 30000, 2);
INSERT into role (title, salary, department_id) VALUES ("Counselor", 80000, 3);


INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John H.", "Patterson", 0, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mary Kay", "Ash", 1, 0);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Dale", "Carnegie", 1, 0);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Montgomery", "Scott", 2, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Angus", "MacGyver", 3, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kaylee", "Frye", 3, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Cyrus", "Smith", 3, 2);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "The Minion", 4, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Marley", 5, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Dylan", 5, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Ross", 6, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Hope", 7, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Deanna", "Troi", 8, null);
