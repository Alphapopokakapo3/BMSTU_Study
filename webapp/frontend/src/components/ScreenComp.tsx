import { Routes, Route, Navigate } from "react-router";
import { ScreenHomework } from "./screenHomework/ScreenHomework.js";
import { ScreenProfile } from "./screenProfile/ScreenProfile.js";
import { ScreenSchedule } from "./screenSchedule/ScreenSchedule.js";
import { ScreenNewHomework } from "./screenNewHomework/ScreenNewHomework.js";
import type { LessonDto } from "../types/api.js";

type ScreenProps = {
    currentPage: string,
    chSchedule: LessonDto[][];
    znSchedule: LessonDto[][];
}


export function ScreenComp({currentPage, chSchedule, znSchedule}: ScreenProps) {
    // switch (currentPage) {
    //     case "page-schedule":
    //         return <ScreenSchedule/>;
    //     case "page-homework":
    //         return <ScreenHomework/>
    //     case "page-profile":
    //         return <ScreenProfile/>
    //     default:
    //         return <ScreenSchedule/>
    // }
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/schedule" replace/>}/>
            <Route path="/schedule" element={<ScreenSchedule chSchedule={chSchedule} znSchedule={znSchedule} updateF={() => {}}/>}/>
            <Route path="/homework" element={<ScreenHomework/>}/>
            <Route path="/profile" element={<ScreenProfile/>}/>
            <Route path="/new_homework" element={<ScreenNewHomework/>}/>
            <Route path="*" element={<Navigate to="/schedule" replace/>}/>
        </Routes>
    )
}