import { currentWeekType } from "../../lib/scheduleUtils.js";
import type { LessonDto } from "../../types/api.js";
import type { LessonType } from "../../types/general.js";

const addDays = (date: Date, amount: number) => {
        const newDate = new Date(date);
        
        newDate.setDate(newDate.getDate() + amount)
        return newDate;
    }

export function getLessonsForTwoWeeks(chSchedule: LessonDto[][], 
        znSchedule: LessonDto[][], 
        disciplineName: string, 
        lessonType: LessonType,
        date: Date = new Date())
{
    const lessonsList = new Array<LessonDto>();
    const dateLessons = new Map<string,LessonDto>();

    for (const day of chSchedule) {
        for (const lesson of day) {
            // console.log(lesson.discipline, lesson.discipline.fullName === disciplineName);
            if (lesson.discipline.fullName === disciplineName && lesson.discipline.actType === lessonType) {
                lessonsList.push(lesson);
            }
        }
    }
    for (const day of znSchedule) {
        for (const lesson of day) {
            if (lesson.discipline.fullName === disciplineName && lesson.discipline.actType === lessonType) {
                lessonsList.push(lesson);
            }
        }
    }
    
    for (let i = 1; i < 14; i++) {
        const nextDate = addDays(date, i);

        const weekType = currentWeekType(nextDate);
        const weekDay = (nextDate.getDay() + 6) % 7 + 1;

        const filteredLessons = lessonsList.filter((item) => (item.week === weekType || item.week === "all") && item.day === weekDay)
        if (filteredLessons.length > 0) {
            dateLessons.set(nextDate.toISOString(), filteredLessons[0]!);
        }
    }
    if (dateLessons.size > 0)
    {
        const minDate = dateLessons.keys().reduce((a, b) => (a < b ? a : b));
        return minDate;
    }
    else {
        return undefined;
    }
    }