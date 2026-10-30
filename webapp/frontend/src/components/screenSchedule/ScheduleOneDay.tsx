import type { LessonUIModel } from "../../types/scheduleUI.js";
import type { ScheduleLessonCardProps } from "./ScheduleLessonCard.js";
import { ScheduleLessonCard } from "./ScheduleLessonCard.js";

type ScheduleOneDayProps = {
    lessons: LessonUIModel[],
}

// TODO: create Lesson type!!!

function ScheduleEmptyDay() {
    return <div className="lesson-card">Выходной</div>
}

export function ScheduleOneDay({lessons}: ScheduleOneDayProps) {
    return(
    <div className="vertical-schedule-viewport">
        { lessons.length !== 0 ?
            lessons.map(element => (
                <ScheduleLessonCard
                    key={`${element.timeText}`}
                    lesson={element}
                />
            )) : <p>Выходной</p>
        }
    </div>);
}