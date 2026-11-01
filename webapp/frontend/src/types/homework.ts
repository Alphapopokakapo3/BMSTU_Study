import type { LessonType } from "./general.js"

export type HomeworkUI = {
    id: number,
    discipline: string,
    text: string,
    deadline: Date,
    deadlineWeek: number,
    lessonType: LessonType,
    done: boolean,
    kind: string,
}