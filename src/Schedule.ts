import { Employee } from "./Employee";
import { Shift } from "./Shift";

export class Schedule {
    shifts: Shift[];
    employees: Employee[];

    constructor(shifts: Shift[], employees: Employee[]) {
        this.shifts = shifts;
        this.employees = employees;
    }

    // this is where the magic happens.
    // need to decide an approach to the problem.
    // 1. brute force. nah, too slow.
    // 2. genetic algorithm. What the hell is that?
    // 3. dynamic programming. I think this is the way to go.
    // 4. greedy algorithm. I think this is the way to go.
    // 5. backtracking. I think this is the way to go.

    // dynmaic programming approach.
    // 1. find the smallest subproblem.
    // 2. find the recurrence relation.
    // 3. find the base case.
    // 4. memoize the results.
    // 5. solve the original problem. 

    schedule(): void {
        var ts: Shift; // current shift.
        var score: number = 0.0;
        var penalties: number[] = [];

    }

    getScheduledHoursForEmployee(employee: Employee): number {
        var hours: number = 0.0;
        this.shifts.forEach(shift => {
            if (shift.assignedTo == employee) {
                hours += shift.end.getTime() - shift.start.getTime();
            }
        });
        return hours;
    }

    assignShift() { };
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

export class ScheduleBuilder {
    private schedule: Schedule;

    constructor() {
        this.schedule = new Schedule([], []);
    }

    setShifts(shifts: Shift[]): ScheduleBuilder {
        this.schedule.shifts = shifts;
        return this;
    }

    setEmployees(employees: Employee[]): ScheduleBuilder {
        this.schedule.employees = employees;
        return this;
    }

    build(): Schedule {
        return this.schedule;
    }
}

