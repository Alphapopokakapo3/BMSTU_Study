import { useEffect, useState } from "react";
import { getSchedule } from "../../lib/api/schedule.js";
import type { LessonUIModel } from "../../types/scheduleUI.js";
import { ScheduleLessonCard } from "./ScheduleLessonCard.js";
import type { LessonDto, ScheduleResponse } from "../../types/api.js";
import { ScheduleOneDay } from "./ScheduleOneDay.js";
import { mapDayLessons, toLessonUI } from "../../mappers/lesson.js";
import {currentWeek, currentWeekType} from "../../lib/scheduleUtils.js"


export function ScreenSchedule() {

    // const testLessonUI: LessonUIModel = {
    //     timeText: "10:20 - 10:30",
    //     audiences: ["400х", "200"],
    //     lessonName: "Программирование",
    //     lessonTypeText: "семинар",
    //     lessonTypeCode: "seminar",
    //     teachers: [],
    //     homeworkText: ["Сделать что нибудь"],
    //     breakTime: 100,
    //     isActive: false,
    //     isBreak: true,
    //     isLast: false
    // }

    const [chSchedule, setChSchedule] = useState<LessonDto[][]>([[], [], [], [], [], [], []]);
    const [znSchedule, setZnSchedule] = useState<LessonDto[][]>([[], [], [], [], [], [], []]);

    const [scheduleData, setScheduleData] = useState<ScheduleResponse|null>(null);

    const [selectedDayDate, setSelectedDayDate] = useState<Date>(new Date())
    
    useEffect(() => {

        getSchedule().then(data => {
            const newChSchedule: LessonDto[][] = [[],[],[],[],[],[],[]];
            const newZnSchedule: LessonDto[][] = [[],[],[],[],[],[],[]];

            
            data.schedule.forEach(el => {
                if (el.week == "ch" || el.week == "all") {
                    newChSchedule[el.day-1]?.push(el);
                }
                if (el.week == "zn" || el.week == "all") {
                    newZnSchedule[el.day-1]?.push(el);
                }
                setChSchedule(newChSchedule);
                setZnSchedule(newZnSchedule);
                
            })
        });}, []);

    
    return (
        <div id="schedule-page-content">
            <div id="schedule-page-head">
                <span id="schedule-page-label">Расписание</span>
                <div id="week-info">
                    <button id="week-number-button">10 нед, числ</button>
                    <button id="month-name-button">сент</button>
                </div>
            </div>
            <div id="weeks-viewport" />
            <div id="horizontal-schedule-viewport">
                <ScheduleOneDay lessons={
                    mapDayLessons(chSchedule[4] ?? [])
                }/>
            </div>
        </div>

    )




    // return <ScheduleLessonCard 
    //     timeText={"10:10 - 10:20"} 
    //     audiences={["505", "523"]}
    //     lessonName={"Аналитическая геометрия"}
    //     lessonType={"семинар"} 
    //     teachers={["Кобцев"]} 
    //     homeworkText={["Сделать чето"]} 
    //     breakTime={10} 
    //     isActive={true} 
    //     isBreak={false}
    //     isLast={true}/>;
}