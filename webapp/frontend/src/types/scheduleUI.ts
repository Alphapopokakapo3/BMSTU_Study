import type { WeekLiter, LessonType } from "./general.js";

export type LessonUIModel = {
    timeText: string,
    audiences: string[],
    lessonName: string,
    lessonTypeText: string,
    lessonTypeCode: LessonType,
    teachers: string[],
    homeworkText: string[],
    breakTime: number,
    isActive: boolean,
    isBreak: boolean,
    isLast: boolean,
    day: number,
    week: string
}