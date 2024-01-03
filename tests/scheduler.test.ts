import { RecurrenceRule, Frequency } from '../src/scheduler';
import {describe, expect, test} from '@jest/globals';

describe('RecurrenceRule', () => {
    test('should return an array of dates', () => {
        expect(new RecurrenceRule(Frequency.DAILY, 1).getRecurrencePattern()).toBeInstanceOf(Array);
    }); 
});

var recurrenceRule = new RecurrenceRule(Frequency.DAILY, 1);

recurrenceRule.getRecurrencePattern().forEach(element => {
    console.log(element.toDateString());
});
