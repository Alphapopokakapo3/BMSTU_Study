import type { WeekLiter, LessonType } from "./general.js";

type Group = {
    name: string
}
type Teacher = {
    firstName: string,
    middleName: string,
    lastName: string
}
type Audience = {
    name: string,
    building: string
}
type Discipline = {
    abbr: string,
    actType: LessonType,
    fullName: string,
    shortName: string
}


export type LessonDto = {
    day: 1|2|3|4|5|6|7,
    time: number,
    week: WeekLiter,
    groups: Group[],

    startTime: string,
    startTimeMinNum: number,
    startTimeHourNum: number,

    endTime: string,
    endTimeMinNum: number,
    endTimeHourNum: number

    teachers: Teacher[],
    audiences: Audience[],
    discipline: Discipline,
}

export type ScheduleResponse = {
    link: string,
    schedule: LessonDto[],
    title: string,
    type: string,
    uuid: string
}