interface IEmployeeBase {
    name: string;
    age: number;
    id: number;
    first_name: string;
    last_name: string;
    hired_date: Date;
}

interface IEmployeeDetails {
    status: string;
    department: string;
    position: string;
    salary: number;
    manager: Employee;
}

interface IEmployee extends IEmployeeBase, IEmployeeDetails { }

export class EmployeeBuilder {
    private employee: IEmployee;

    constructor() {
        this.employee = {} as IEmployee;
    }

    setName(name: string): EmployeeBuilder {
        this.employee.name = name;
        return this;
    }

    setAge(age: number): EmployeeBuilder {
        this.employee.age = age;
        return this;
    }

    setId(id: number): EmployeeBuilder {
        this.employee.id = id;
        return this;
    }

    setFirstName(firstName: string): EmployeeBuilder {
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
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _age: number;

    public get age(): number {
        return this._age;
    }

    public set age(value: number) {
        if (value < 0) {
            throw new Error("Age cannot be negative.");
        }
        this._age = value;
    }

    _id: number;
    _first_name: string;
    _last_name: string;
    _hired_date: Date;
    _status: string;
    _department: string;
    _position: string;
    _salary: number;
    _manager?: Employee;

    constructor(employee: IEmployee) {
        this._name = employee.name;
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

