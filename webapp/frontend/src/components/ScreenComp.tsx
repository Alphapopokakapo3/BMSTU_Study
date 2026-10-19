import { ScreenHomework } from "./screenHomework/ScreenHomework.js";
import { ScreenProfile } from "./screenProfile/ScreenProfile.js";
import { ScreenSchedule } from "./screenSchedule/ScreenSchedule.js";

type ScreenProps = {
    currentPage: string
}


export function ScreenComp({currentPage}: ScreenProps) {
    switch (currentPage) {
        case "page-schedule":
            return <ScreenSchedule/>;
        case "page-homework":
            return <ScreenHomework/>
        case "page-profile":
            return <ScreenProfile/>
        default:
            return <ScreenSchedule/>
    }
}