import { Employee, EmployeeBuilder, IEmployee } from "../src/Employee";


var employee2: Employee = new EmployeeBuilder()
    .setAge(30)
    .setStatus("Full Time")
    .setDepartment("Meat")
    .setHiredDate(new Date("1/1/1990"))
    .setSalary(100000) // he makes bank
    .build();


var joe = {
    name: "John Doe",
    age: 30,
    status: "Full Time",
    department: "Meat",
    hired_date: new Date("1/1/1990"),
    salary: 100000
}

var joe2: IEmployee = {
    age: 30,
    status: "Full Time",
    department: "Meat",
    hired_date: new Date("1/1/1990"),
    salary: 100000, 
    id: 1,
    first_name: "John",
    last_name: "Doe",
    manager: null,
    position: null
}




var employee: Employee = new Employee("John", "Doe", new Date("1/1/1990"));

employee.getScheduledHours(sched);

