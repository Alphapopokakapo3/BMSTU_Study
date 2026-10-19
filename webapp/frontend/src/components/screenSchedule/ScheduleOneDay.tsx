import type { LessonUIModel } from "../../types/scheduleUI.js";
import type { ScheduleLessonCardProps } from "./ScheduleLessonCard.js";
import { ScheduleLessonCard } from "./ScheduleLessonCard.js";

type ScheduleOneDayProps = {
    lessons: LessonUIModel[]
}

// TODO: create Lesson type!!!

export function ScheduleOneDay({lessons}: ScheduleOneDayProps) {
    return ( 
    <div className="vertical-schedule-viewport">
        {
            lessons.map(element => (
                <ScheduleLessonCard
                    key={`${element.lessonName}-${element.day}-${element.week}-${element.timeText}`}
                    lesson={element}
                />
            ))
        }
    </div>);
}