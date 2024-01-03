"use strict";
// Scheduler core algorithms. 
// Use genetic programming to find the best schedule for a given set of tasks.
// Given, a list of Employees, shift requirements, employee preferences, and rules for 
// employee scheduling, find the best schedule. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = exports.Schedule = exports.DatePart = exports.RecurrenceRule = exports.Frequency = exports.DayOfWeek = void 0;
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["MO"] = "MO";
    DayOfWeek["TU"] = "TU";
    DayOfWeek["WE"] = "WE";
    DayOfWeek["TH"] = "TH";
    DayOfWeek["FR"] = "FR";
    DayOfWeek["SA"] = "SA";
    DayOfWeek["SU"] = "SU";
})(DayOfWeek || (exports.DayOfWeek = DayOfWeek = {}));
var Frequency;
(function (Frequency) {
    Frequency["DAILY"] = "DAILY";
    Frequency["WEEKLY"] = "WEEKLY";
    Frequency["MONTHLY"] = "MONTHLY";
    Frequency["YEARLY"] = "YEARLY";
})(Frequency || (exports.Frequency = Frequency = {}));
// this looks like 
var requirements = [
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
var RecurrenceRule = /** @class */ (function () {
    function RecurrenceRule(frequency, interval) {
        this._frequency = frequency;
        this._interval = interval;
    }
    Object.defineProperty(RecurrenceRule.prototype, "frequency", {
        get: function () {
            return this._frequency;
        },
        set: function (value) {
            this._frequency = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceRule.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        set: function (value) {
            if (value < 1) {
                throw new Error("Interval must be greater than 0");
            }
            else if (value > 1 && this._frequency === Frequency.YEARLY) {
                throw new Error("Interval must be 1 when frequency is yearly");
            }
            this._interval = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceRule.prototype, "daysOfWeek", {
        get: function () {
            return this._daysOfWeek;
        },
        set: function (value) {
            if (value && this._frequency !== Frequency.WEEKLY) {
                throw new Error("Days of week can only be set when frequency is weekly");
            }
            this._daysOfWeek = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceRule.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (value) {
            this._count = value;
        },
        enumerable: false,
        configurable: true
    });
    RecurrenceRule.prototype.getRecurrencePattern = function () {
        var flattenedDates = [];
        var startDate = this.startDate || new Date(); // Use current date if start date is not provided
        switch (this.frequency) {
            case Frequency.DAILY:
                if (this.count && !this.endDate) {
                    // daily recurrence with count
                    // TODO: test this
                    for (var i = 0; i < this.count; i++) {
                        flattenedDates.push(new Date(startDate.getTime() + DatePart.day * i));
                    }
                }
                else if (this.endDate && !this.count) {
                    // daily recurrence with end date
                    for (var i = 0; i < this.endDate.getTime() - startDate.getTime(); i += DatePart.day) {
                        flattenedDates.push(new Date(startDate.getTime() + i));
                    }
                }
                break;
            case Frequency.WEEKLY:
                if (this.count && !this.endDate) {
                    // weekly recurrence with count
                    for (var i = 0; i < this.count; i++) {
                        flattenedDates.push(new Date(startDate.getTime() + DatePart.week * i));
                    }
                }
                else if (this.endDate && !this.count) {
                    // weekly recurrence with end date
                    for (var i = 0; i < this.endDate.getTime() - startDate.getTime(); i += DatePart.week) {
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
    };
    return RecurrenceRule;
}());
exports.RecurrenceRule = RecurrenceRule;
var DatePart;
(function (DatePart) {
    DatePart[DatePart["minute"] = 60000] = "minute";
    DatePart[DatePart["hour"] = 3600000] = "hour";
    DatePart[DatePart["day"] = 86400000] = "day";
    DatePart[DatePart["month"] = 2592000000] = "month";
    DatePart[DatePart["year"] = 31536000000] = "year";
    DatePart[DatePart["week"] = 31536000001] = "week";
})(DatePart || (exports.DatePart = DatePart = {}));
var Schedule = /** @class */ (function () {
    function Schedule(shifts, employees) {
        this.shifts = shifts;
        this.employees = employees;
    }
    return Schedule;
}());
exports.Schedule = Schedule;
var Employee = /** @class */ (function () {
    function Employee(firstName, lastName, hiredDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hiredDate = hiredDate;
    }
    return Employee;
}());
exports.Employee = Employee;
