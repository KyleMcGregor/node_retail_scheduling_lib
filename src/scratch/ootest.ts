interface IPerson {
    name: string;
    age: number;
}


export class Person implements IPerson { 
    private person: IPerson;
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
        this._age = value;
    }

    constructor(){
        this.person = {} as IPerson;
    }
}

export class PersonBuilder {
    private person: IPerson;
    constructor() {
        this.person = {} as IPerson;
    }

    setName(name: string): PersonBuilder {
        this.person.name = name;
        return this;
    }

    setAge(age: number): PersonBuilder {
        this.person.age = age;
        return this;
    }

    build(): Person {
        return new Person();
    }
}

var person = new PersonBuilder()
    .setName("John")
    .setAge(30)
    .build();