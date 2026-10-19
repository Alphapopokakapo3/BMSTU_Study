import type { LessonUIModel } from "../../types/scheduleUI.js";

export type ScheduleLessonCardProps = {
    lesson: LessonUIModel
}


export function ScheduleLessonCard({lesson}: ScheduleLessonCardProps) {

    const lessonTypeClassList = `lesson-card-type ${lesson.lessonTypeCode}`;

    return (
        <div className="lesson-card">
            <div className="lesson-card-info">
                <div className="lesson-card-hat">
                    <span className={lesson.isActive ? "lesson-card-time active-now" : "lesson-card-time"}>{lesson.timeText}</span>
                    <span className="lesson-card-audience">{lesson.audiences.join(", ")}</span>
                </div>
                <div className="lesson-card-description">
                    <span className="lesson-card-name">{lesson.lessonName}</span>
                    <span className={lessonTypeClassList}>{lesson.lessonTypeText}</span>
                </div>
                <span className="lesson-card-teachers">{lesson.teachers.join(", ")}</span>
                <span className="lesson-card-homework hidden">{lesson.homeworkText.join("\n")}</span>
            </div>
            <div className={lesson.isLast ? "lesson-card-break hidden" : "lesson-card-break"}>
                <p className={lesson.isBreak ? "lesson-card-break-text active-now" : "lesson-card-break-text"}>Перерыв {lesson.breakTime} мин.</p>
            </div>
        </div>
);

}