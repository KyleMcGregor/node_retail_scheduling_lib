// all of the non null fields stored in the base interface

interface IEmployeeBase {
    age: number;
    id: number;
    first_name: string;
    last_name: string;
    hired_date: Date;
}


// all of the nullable fields stored in the details interface
interface IEmployeeDetails {
    status: string | null;
    department: string| null;
    position: string| null;
    salary: number| null;
    manager: Employee| null;
}

export interface IEmployee extends IEmployeeBase, IEmployeeDetails { }

export class EmployeeBuilder {
    private employee: IEmployee;

    constructor() {
        this.employee = {} as IEmployee;
    }

    setAge(age: number): EmployeeBuilder {
        if(age < 0) throw new Error("Age cannot be negative.");
        if(age > 120) throw new Error("Age cannot be greater than 120.");

        this.employee.age = age;
        return this;
    }

    setId(id: number): EmployeeBuilder {
        // TODO: validate id, should this be a round trip to the database?
        // no, the database should validate the id.
        // im just the in memory representation of the employee.
        this.employee.id = id;
        return this;
    }

    setFirstName(firstName: string): EmployeeBuilder {
        if(firstName.length < 1) throw new Error("First name cannot be empty.");
        if(firstName.length > 50) throw new Error("First name cannot be longer than 50 characters."); 
        this.employee.first_name = firstName;
        return this;
    }

    setLastName(lastName: string): EmployeeBuilder {
        this.employee.last_name = lastName;
        return this;
    }

    setHiredDate(hiredDate: Date): EmployeeBuilder {
        this.employee.hired_date = hiredDate;
        return this;
    }

    setStatus(status: string): EmployeeBuilder {
        this.employee.status = status;
        return this;
    }

    setDepartment(department: string): EmployeeBuilder {
        this.employee.department = department;
        return this;
    }

    setPosition(position: string): EmployeeBuilder {
        this.employee.position = position;
        return this;
    }

    setSalary(salary: number): EmployeeBuilder {
        this.employee.salary = salary;
        return this;
    }

    setManager(manager: Employee): EmployeeBuilder {
        this.employee.manager = manager;
        return this;
    }

    build(): Employee {
        return new Employee(this.employee);
    }
}

export class Employee {
    _age: number;
    private _id: number;
    public get id(): number {
        return this._id;
    }

    _first_name: string;
    _last_name: string;
    _hired_date: Date;
    _status: string | null;
    _department: string | null;
    _position: string | null;
    _salary: number | null;
    _manager: Employee | null;

    constructor(employee: IEmployee) {
        this._age = employee.age;
        this._id = employee.id;
        this._first_name = employee.first_name;
        this._last_name = employee.last_name;
        this._hired_date = employee.hired_date;
        this._status = employee.status;
        this._department = employee.department;
        this._position = employee.position;
        this._salary = employee.salary;
        this._manager = employee.manager;
    }
};

