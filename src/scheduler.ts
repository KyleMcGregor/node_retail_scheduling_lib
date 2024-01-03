// Scheduler core algorithms. 
// Use genetic programming to find the best schedule for a given set of tasks.
// Given, a list of Employees, shift requirements, employee preferences, and rules for 
// employee scheduling, find the best schedule. 

// represent the shift requirements. 


export interface IShift {
    start: Date;
    end: Date;
    assignedTo?: Employee;
}

// outline of process to select next insertion. 
// 1st priority: fulfill the shift role requirements. 
// 2nd priority: fulfill the employee preferences.

// When thinking about how the user see's shift requirements. 
// They are thinking (and me) in teh aggregate.
// for example. I need 3 meat cutters, 2 cashiers, 1 manager, 1 janitor, 1 stocker
// on every monday. How do I represent this?

export interface IShiftRequirement {
    role: string;
    count: number;
    days: Date[];
}

export enum DayOfWeek {
    MO = 'MO',
    TU = 'TU',
    WE = 'WE',
    TH = 'TH',
    FR = 'FR',
    SA = 'SA',
    SU = 'SU'
}

export enum Frequency {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}

// this looks like 
var requirements: IShiftRequirement[] = [
    {
        role: "meat cutter",
        count: 3,
        days: [new Date("2019-01-01"), new Date("2019-01-08"), new Date("2019-01-15")]
    },
    {
        role: "cashier",
        count: 2,
        days: [new Date("2019-01-01"), new Date("2019-01-08"), new Date("2019-01-15")]
    },
    {
        role: "manager",
        count: 1,
        days: [new Date("2019-01-01"), new Date("2019-01-08"), new Date("2019-01-15")]
    },
    {
        role: "janitor",
        count: 1,
        days: [new Date("2019-01-01"), new Date("2019-01-08"), new Date("2019-01-15")]
    },
    {
        role: "stocker",
        count: 1,
        days: [new Date("2019-01-01"), new Date("2019-01-08"), new Date("2019-01-15")]
    }
];

// This makes a recurrence pattern akward. Would need to be done using a function? 

export class RecurrenceRule {
    // teh combination of nullable and non nullable fields in this class is akward.
    // ensure that the invariant is maintained in the setters and constructor.
    private _frequency: Frequency; // all rule recurrences must have a frequency.
    public get frequency(): Frequency {
        return this._frequency;
    }
    public set frequency(value: Frequency) {
        this._frequency = value;
    }

    private _interval: number;
    public get interval(): number {
        return this._interval;
    }

    public set interval(value: number) {
        if (value < 1) {
            throw new Error("Interval must be greater than 0");
        } else if (value > 1 && this._frequency === Frequency.YEARLY) {
            throw new Error("Interval must be 1 when frequency is yearly");
        }

        this._interval = value;
    }

    private _daysOfWeek?: DayOfWeek | undefined;
    public get daysOfWeek(): DayOfWeek | undefined {
        return this._daysOfWeek;
    }
    public set daysOfWeek(value: DayOfWeek | undefined) {
        if (value && this._frequency !== Frequency.WEEKLY) {
            throw new Error("Days of week can only be set when frequency is weekly");
        }
        this._daysOfWeek = value;
    }


    monthDay?: number;  // ie: on the 15th of the month.
    month?: number;     // ie: on the 3rd month of the year.
    endDate?: Date;
    private _count?: number | undefined;     // ie: repeat 5 times.
    public get count(): number | undefined {
        return this._count;
    }
    public set count(value: number | undefined) {
        this._count = value;
    }
    exceptions?: Date[];// any dates that should be excluded from the recurrence pattern.
    startDate?: Date;

    constructor(frequency: Frequency, interval: number) {
        this._frequency = frequency;
        this._interval = interval;
    }

    getRecurrencePattern(): Date[] {
        const flattenedDates: Date[] = [];
        const startDate = this.startDate || new Date(); // Use current date if start date is not provided
    
        switch (this.frequency) {
            case Frequency.DAILY:
                if (this.count && !this.endDate) {
                    // daily recurrence with count
                    // TODO: test this
                    for (let i = 0; i < this.count; i++) {
                        flattenedDates.push(new Date(startDate.getTime() + DatePart.day * i));
                    }
                } else if (this.endDate && !this.count) {
                    // daily recurrence with end date
                    for(let i = 0; i < this.endDate.getTime() - startDate.getTime(); i += DatePart.day) {
                        flattenedDates.push(new Date(startDate.getTime() + i));
                    }
                }

                break;
    
            case Frequency.WEEKLY:
                if(this.count && !this.endDate) {
                    // weekly recurrence with count
                    for(let i = 0; i < this.count; i++) {
                        flattenedDates.push(new Date(startDate.getTime() + DatePart.week * i));
                    }
                } else if (this.endDate && !this.count) {
                    // weekly recurrence with end date
                    for(let i = 0; i < this.endDate.getTime() - startDate.getTime(); i += DatePart.week) {
                        flattenedDates.push(new Date(startDate.getTime() + i));
                    }
                }
                break;
    
            case Frequency.MONTHLY:
                // Handle monthly recurrence logic here
                break;
    
            case Frequency.YEARLY:
                // Handle yearly recurrence logic here
                break;
    
            default:
                throw new Error("Invalid recurrence frequency");
        }
    
        return flattenedDates;
    }
}

export enum DatePart {
    minute = 1000 * 60,                 // 1 minute
    hour = 1000 * 60 * 60,            // 1 hour
    day = 1000 * 60 * 60 * 24,       // 1 day
    month = 1000 * 60 * 60 * 24 * 30,   // 1 month
    year = 1000 * 60 * 60 * 24 * 365,  // 1 year
    week
}


export class Schedule {
    shifts: IShift[];
    employees: Employee[];

    constructor(shifts: IShift[], employees: Employee[]) {
        this.shifts = shifts;
        this.employees = employees;
    }
}

export class Employee {
    firstName: string;
    lastName: string;
    hiredDate?: Date;
    shiftPreference?: Date[];
    role?: string;

    constructor(firstName: string, lastName: string, hiredDate?: Date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hiredDate = hiredDate;
    }
}