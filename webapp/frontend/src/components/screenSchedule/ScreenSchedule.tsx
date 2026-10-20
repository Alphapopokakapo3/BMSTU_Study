import { useEffect, useState } from "react";
import { getSchedule } from "../../lib/api/schedule.js";
import type { LessonUIModel } from "../../types/scheduleUI.js";
import { ScheduleLessonCard } from "./ScheduleLessonCard.js";
import type { LessonDto, ScheduleResponse } from "../../types/api.js";
import { ScheduleOneDay } from "./ScheduleOneDay.js";
import { mapDayLessons, toLessonUI } from "../../mappers/lesson.js";
import { currentWeek, currentWeekType } from "../../lib/scheduleUtils.js"

const WEEKS = {"ch": "числитель", "zn": "знаменатель"}
const SHORT_WEEKS = {"ch": "чc", "zn": "зн"}

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

    const [selectedDayDate, setSelectedDayDate] = useState<Date>(new Date())
    const [selectedWeekDayNum, setSelectedWeekDayNum] = useState<number>((new Date().getDay()+6) % 7);

    const setSelectedWeekDayByDate = (date: Date) => {
        setSelectedWeekDayNum((date.getDay()+6)%7);
    }

    const [threeWeeksSchedule, setThreeWeeksSchedule] = useState<LessonDto[][][]>([[], [], []]);

    const [selectedWeekNum, setSelectedWeekNum] = useState<number>(currentWeek());

    function getWeekScheduleByWeekNum(week: number, chSch: LessonDto[][], znSch: LessonDto[][]): LessonDto[][] {
        return week%2 == 1 ? chSch : znSch;
    }

    
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
                
            })

            setChSchedule(newChSchedule);
            setZnSchedule(newZnSchedule);

            const generatedWeeksSchedule = [
                selectedWeekNum - 1,
                selectedWeekNum,
                selectedWeekNum + 1
            ].map(el => getWeekScheduleByWeekNum(el, newChSchedule, newZnSchedule))

            setThreeWeeksSchedule(generatedWeeksSchedule);
            console.log(generatedWeeksSchedule)
            
        });}, []);

    
    return (
        <div id="schedule-page-content">
            <div id="schedule-page-head">
                <span id="schedule-page-label">Расписание</span>
                <div id="week-info">
                    <button id="week-number-button">{selectedWeekNum} нед, {SHORT_WEEKS[selectedWeekNum%2==1 ? "ch" : "zn"]}</button>
                    <button id="month-name-button">сент</button>
                </div>
            </div>
            <div id="weeks-viewport" />
            <div id="horizontal-schedule-viewport">
                <ScheduleOneDay lessons={
                    mapDayLessons(threeWeeksSchedule?.[1]?.[selectedWeekDayNum] ?? [])
                }/>
                <ScheduleOneDay lessons={
                    mapDayLessons(threeWeeksSchedule?.[1]?.[selectedWeekDayNum+1] ?? [])
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