import { currentWeek } from "../lib/scheduleUtils.js";
import type { HomeworkDto } from "../types/api.js";
import type { LessonType } from "../types/general.js";
import type { HomeworkUI } from "../types/homework.js";



function homeworkDtoToHomeworkUI(dto: HomeworkDto): HomeworkUI {
    const newHomework: HomeworkUI = {
        id: dto.id,
        discipline: dto.subject,
        text: dto.description,
        deadline: new Date(dto.due_at),
        deadlineWeek: dto.due_week ? dto.due_week : currentWeek(new Date(dto.due_at)),
        lessonType: dto.lesson_type as LessonType,
        done: dto.done,
        kind: dto.kind,
    };

    return newHomework;
}


export function homeworkDtoListToHomeworkUI(dto: HomeworkDto[]): HomeworkUI[] {

    return dto.map(homeworkDtoToHomeworkUI);
}