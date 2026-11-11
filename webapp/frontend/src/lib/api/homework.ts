import type { AddHomeworkDto, HomeworkDto } from "../../types/api.js";
import {get, post} from "./controller.js";

export async function getAllSchedule(user_id: number): Promise<HomeworkDto[]> {
    return await get<HomeworkDto[]>("/api/homework/all");
}

export async function toggleHomeworkDone(homeworkId: number): Promise<HomeworkDto[]> {
    return await post<HomeworkDto[]>(`/api/homework/toggle_done/${homeworkId}`);
}

export async function createNewHomework(homework: AddHomeworkDto) {
    const response = await fetch("/api/homework/add", 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(homework)
        }
    );

    if (!response.ok) return false;
    return true;
}