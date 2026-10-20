import type {LessonDto} from "../types/api.ts";
import type {LessonUIModel} from "../types/scheduleUI.ts";
import {currentWeekType} from "./scheduleUtils.ts";


export function scheduleUIModelForDay(data: LessonDto[][], day: Date = new Date()): LessonUIModel[] {
    
}