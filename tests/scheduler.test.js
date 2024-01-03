"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scheduler_1 = require("../src/scheduler");
var recurrenceRule = new scheduler_1.RecurrenceRule(scheduler_1.Frequency.DAILY, 1);
recurrenceRule.getRecurrencePattern().forEach(function (element) {
    console.log(element.toDateString());
});
