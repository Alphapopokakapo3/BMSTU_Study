import type { ScheduleResponse } from '../../types/api.js';
import {get} from './controller.js'

export async function getSchedule(): Promise<ScheduleResponse> {
    return await get<ScheduleResponse>("/api/schedule");
}