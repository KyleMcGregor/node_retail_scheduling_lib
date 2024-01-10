
import { Employee } from "./Employee";

export class Shift {
    start: Date;
    end: Date;
    assignedTo?: Employee;

    constructor(start: Date, end: Date, assignedTo?: Employee) {
        this.start = start;
        this.end = end;
        this.assignedTo = assignedTo;
    }

}


export interface IShift {
    start: Date;
    end: Date;
    assignedTo?: Employee;
}
export interface IShiftRequirement {
    role: string;
    count: number;
    days: Date[];
}
