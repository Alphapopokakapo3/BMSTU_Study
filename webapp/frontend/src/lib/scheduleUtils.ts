import type {WeekLiter} from '../types/general.ts'

const SEMESTER_START = new Date('2026-08-31T00:00:00.000+00:03');

export function currentWeek(date: Date = new Date(), semester_start: Date = SEMESTER_START): number {
    const diffDays = (date - semester_start) / (1000 * 60 * 60 * 24);
    const diffWeeks = Math.floor(diffDays/7);

    return diffWeeks + 1;
}

export function currentWeekType(date: Date = new Date(), semester_start: Date = SEMESTER_START): WeekLiter {
    const weekNum = currentWeek(date, semester_start);

    return (weekNum%2==0) ? "zn" : "ch";
}

