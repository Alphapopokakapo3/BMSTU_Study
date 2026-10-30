import type { LessonType } from "./general.js"

export type HomeworkWeekList = {

}

export type HomeworkUI = {
    text: string,
    deadline: Date,
    lessonType: LessonType,
    done: boolean,
}