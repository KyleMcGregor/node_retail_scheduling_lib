import {describe, expect, test} from '@jest/globals';
import { Connection } from 'mssql';

import { RecurrenceRule, Frequency } from '../src/RecurrenceRule';


var dailyRule: RecurrenceRule = new RecurrenceRule(Frequency.DAILY, 1);


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


describe('RecurrenceRule', () => {
    test('should return an array of dates', () => {
        expect(new RecurrenceRule(Frequency.DAILY, 1).getRecurrencePattern()).toBeInstanceOf(Array);
    });

    
    test('content', () => {
        dailyRule.getRecurrencePattern().forEach(element => {
            expect(element).toBeInstanceOf(Date);
        });
    });
});



var recurrenceRule = new RecurrenceRule(Frequency.DAILY, 1);

recurrenceRule.getRecurrencePattern().forEach(element => {
    console.log(element.toDateString());
});
