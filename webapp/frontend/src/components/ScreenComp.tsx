import { Routes, Route, Navigate } from "react-router";
import { ScreenHomework } from "./screenHomework/ScreenHomework.js";
import { ScreenProfile } from "./screenProfile/ScreenProfile.js";
import { ScreenSchedule } from "./screenSchedule/ScreenSchedule.js";
import { ScreenNewHomework } from "./screenNewHomework/ScreenNewHomework.js";

type ScreenProps = {
    currentPage: string
}


export function ScreenComp({currentPage}: ScreenProps) {
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
            <Route path="/schedule" element={<ScreenSchedule/>}/>
            <Route path="/homework" element={<ScreenHomework/>}/>
            <Route path="/profile" element={<ScreenProfile/>}/>
            <Route path="/new_homework" element={<ScreenNewHomework/>}/>
        </Routes>
    )
}