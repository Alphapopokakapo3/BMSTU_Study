import type { LessonDto } from "../types/api.js";
import type { LessonUIModel } from "../types/scheduleUI.js";

export function toLessonUI(dto: LessonDto, nextDto: LessonDto | null, currentTime: Date, lessonDate: Date): LessonUIModel {

    const audiences = dto.audiences.map(a => a.name);
    let lessonTypeText = "";

    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const curMin = hour*60 + minute

    const startHour = dto.startTimeHourNum;
    const startMin = dto.startTimeMinNum;
    const endHour = dto.endTimeHourNum;
    const endMin = dto.endTimeMinNum;
    

    let isLast = false;
    let isBreak = false;
    let breakTime = 0;

    if (nextDto === null) {
        isLast = true;
    } else {
        breakTime = (nextDto.startTimeHourNum - endHour) * 60 + nextDto.startTimeMinNum - endMin;
        isBreak = curMin >= (endHour*60+endMin) && curMin < (nextDto.startTimeHourNum*60 + nextDto.startTimeMinNum) && (new Date(lessonDate).setHours(0,0,0,0)) === new Date(currentTime).setHours(0,0,0,0);
    }

    let isActive = false;
    isActive = (curMin >= startHour*60+startMin) && (curMin < (endHour*60+endMin) && (new Date(lessonDate).setHours(0,0,0,0)) === new Date(currentTime).setHours(0,0,0,0));

    
    switch (dto.discipline.actType) {
        case "lab":
            lessonTypeText = "лаб."
            break;
        case "seminar":
            lessonTypeText = "семинар"
            break;
        case "lecture":
            lessonTypeText = "лекция"
            break;
        default:
            lessonTypeText = "";
            break
    }

    const teachersNames = dto.teachers.map(t => `${t.lastName} ${t.firstName} ${t.middleName}`)

    return {
        timeText: `${dto.startTime} - ${dto.endTime}`,
        audiences: audiences,
        lessonName: dto.discipline.fullName,
        lessonTypeText: lessonTypeText,
        lessonTypeCode: dto.discipline.actType,
        teachers: teachersNames,
        homeworkText: [],
        breakTime: breakTime,
        isActive: isActive,
        isBreak: isBreak,
        isLast: isLast,
        day: dto.day,
        week: dto.week
    };
}


export function mapDayLessons(dayLessons: LessonDto[], lessonsDate: Date): LessonUIModel[] {
    return dayLessons.map((currentLesson, index, array) => {
        const nextLesson = array[index+1] || null;
        return toLessonUI(currentLesson, nextLesson, new Date(), lessonsDate);
    })
}