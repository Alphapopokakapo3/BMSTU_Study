import type { HomeworkDto } from "../../types/api.js";
import {get} from "./controller.js";

export async function getAllSchedule(user_id: number): Promise<HomeworkDto[]> {
    return await get<HomeworkDto[]>("/api/homework/all");
}