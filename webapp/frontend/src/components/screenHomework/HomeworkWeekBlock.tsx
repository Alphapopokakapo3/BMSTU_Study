import { useContext } from "react"
import type { LessonType } from "../../types/general.js"
import type { HomeworkUI } from "../../types/homework.js"
import { ClickContext } from "./ClickContext.js"



export type HomeworkDisciplineBlockProps = {
    homeworkList: HomeworkUI[]
}

type OneHomeworkTileProps = {
    homework: HomeworkUI
}

type HomeworkCheckBoxButtonProps = {
    isActive: boolean,
    onClick: () => void
}

type HomeworkDateBlockProps = {
    homeworkList: HomeworkUI[]
}

const lessonTypeName = new Map<LessonType, string>()
lessonTypeName.set("lab", "лаб");
lessonTypeName.set("lecture", "лек");
lessonTypeName.set("seminar", "сем");
lessonTypeName.set("unknown", "");


function HomeworkCheckBoxButton({isActive, onClick}: HomeworkCheckBoxButtonProps) {
    const squareClassName = isActive ? "homework-check-box active" : "homework-check-box";

    return (
        <button className="homework-check-box-button" onClick={onClick}>
            <div className={squareClassName}></div>
        </button>
    );
}

export function OneHomeworkTile({homework}: OneHomeworkTileProps) {
    const handleClick = useContext(ClickContext);
    return (
        <div className="homework-tile">
            <HomeworkCheckBoxButton isActive={homework.done} onClick={() => {handleClick(homework.id)}}/>
            <div className="homework-tile-content">
                <span className="homework-tile-tag">{lessonTypeName.get(homework.lessonType)}</span>
                <span className="homework-tile-text">{homework.text}</span>
            </div>
        </div>
    );
}

export function HomeworkDisciplineBlock({homeworkList}: HomeworkDisciplineBlockProps) {
    return (
        <div className="homework-discipline-block">
            <span className="homework-discipline-title">{homeworkList[0]?.discipline}</span>
            {
                homeworkList.map(h => (
                    <OneHomeworkTile homework={h}/>
                ))
            }
        </div>
    );
}

function HomeworkDateBlock({homeworkList}: HomeworkDateBlockProps) {
    const byName = Map.groupBy(homeworkList, (h) => h.discipline);

    return (
        <div className="homework-date-block">
            <span className="homework-date-title">{`${homeworkList[0]?.deadline.getDate()}.${homeworkList[0]?.deadline.getMonth()}`}</span>
            <div>
                {
                    [...byName].map(([name, items]) => (
                        <HomeworkDisciplineBlock homeworkList={items}/>
                    ))
                }
            </div>
        </div>
    );
}

export function HomeworkWeekBlock({homeworkList}: HomeworkDisciplineBlockProps) {

    const byDate = Map.groupBy(homeworkList, (h) => new Date(h.deadline).setHours(0,0,0,0));

    return (
        <div className="homework-week-block">
            <span className="homework-week-title">НЕДЕЛЯ {homeworkList[0]?.deadlineWeek}</span>
            <div>
                {
                    [...byDate].map(([date, items]) => (
                        <HomeworkDateBlock homeworkList={items}/>
                    ))
                }
                {}
            </div>
        </div>
    );
}