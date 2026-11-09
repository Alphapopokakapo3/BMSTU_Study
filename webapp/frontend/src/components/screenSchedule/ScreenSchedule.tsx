import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getSchedule } from "../../lib/api/schedule.js";
import type { LessonUIModel } from "../../types/scheduleUI.js";
import { ScheduleLessonCard } from "./ScheduleLessonCard.js";
import type { LessonDto, ScheduleResponse } from "../../types/api.js";
import { ScheduleOneDay } from "./ScheduleOneDay.js";
import { mapDayLessons, toLessonUI } from "../../mappers/lesson.js";
import { currentWeek, currentWeekType } from "../../lib/scheduleUtils.js"
import { WeekBlock } from "./WeekBlock.js";

const WEEKS = {"ch": "числитель", "zn": "знаменатель"};
const SHORT_WEEKS = {"ch": "чc", "zn": "зн"};
const MONTHS = ["янв", "фев", "март", "апр", "май", "июнь", "июль", "авг", "сент", "окт", "ноя", "дек"];

type ScreenScheduleProps = {
    chSchedule: LessonDto[][];
    znSchedule: LessonDto[][];
    updateF: () => void;
}

export function ScreenSchedule({chSchedule, znSchedule, updateF}: ScreenScheduleProps) {

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

    // const [loadingStatus, setLoadingStatus] = useState("idle");

    const addDays = (date: Date, amount: number) => {
        const newDate = new Date(date);
        
        newDate.setDate(newDate.getDate() + amount)
        return newDate;
    }

    function getWeekStart(date: Date): Date {
        const monday = new Date(date);
        const daysSinceMonday = (monday.getDay() + 6) % 7;

        monday.setDate(monday.getDate() - daysSinceMonday);
        monday.setHours(0,0,0,0);

        return monday;
    }

    // const [chSchedule, setChSchedule] = useState<LessonDto[][]>([[], [], [], [], [], [], []]);
    // const [znSchedule, setZnSchedule] = useState<LessonDto[][]>([[], [], [], [], [], [], []]);

    const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
    const prevDate = addDays(selectedDate, -1);
    const nextDate = addDays(selectedDate, 1);
    const prev2Date = addDays(selectedDate, -2);
    const next2Date = addDays(selectedDate, 2);

    const [selectedWeek, setSelectedWeek] = useState<Date>(() => getWeekStart(selectedDate));
    const prevWeek = addDays(selectedWeek, -7);
    const nextWeek = addDays(selectedWeek, 7);
    

    const shiftDay = (amount: number) => {
        setSelectedDate(date => {
            const next = new Date(date);

            next.setDate(next.getDate() + amount);

            setSelectedWeek(getWeekStart(next));
            return next;
        })
    }

    const shiftWeek = (amount: number) => {
        setSelectedWeek(date => (addDays(date, amount*7)))
        console.log("shift");
    }

    const toggleDayClick = (newDate: Date) => {
        if (newDate !== selectedDate)
            setSelectedDate(newDate);
    }
    


    // const [selectedDayDate, setSelectedDayDate] = useState<Date>(new Date())
    // const [selectedWeekDayNum, setSelectedWeekDayNum] = useState<number>((new Date().getDay()+6) % 7);

    // const setSelectedWeekDayByDate = (date: Date) => {
    //     setSelectedWeekDayNum((date.getDay()+6)%7);
    // }


    const [selectedWeekNum, setSelectedWeekNum] = useState<number>(currentWeek());

    function getWeekScheduleByWeekNum(week: number, chSch: LessonDto[][], znSch: LessonDto[][]): LessonDto[][] {
        return week%2 == 1 ? chSch : znSch;
    }

    function getLessonsForDate(date: Date, chSch: LessonDto[][], znSch: LessonDto[][]): LessonDto[] {
        return getWeekScheduleByWeekNum(currentWeek(date), chSch, znSch)[(date.getDay() + 6) % 7] ?? [];
    }

    
    // useEffect(() => {

    //     getSchedule().then(data => {
    //         const newChSchedule: LessonDto[][] = [[],[],[],[],[],[],[]];
    //         const newZnSchedule: LessonDto[][] = [[],[],[],[],[],[],[]];

            
    //         data.schedule.forEach(el => {
    //             if (el.week == "ch" || el.week == "all") {
    //                 newChSchedule[el.day-1]?.push(el);
    //             }
    //             if (el.week == "zn" || el.week == "all") {
    //                 newZnSchedule[el.day-1]?.push(el);
    //             }
                
    //         })

    //         setChSchedule(newChSchedule);
    //         setZnSchedule(newZnSchedule);
            
    //     });}, []);
    
    useEffect(() => {
        // console.log(selectedDate);
        setSelectedWeekNum(currentWeek(selectedDate));
    }, [selectedDate]);


    const viewportScheduleRef = useRef<HTMLDivElement>(null);
    const viewportWeeksRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const viewport = viewportScheduleRef.current;
        if (viewport) {
            viewport.scrollLeft = viewport.clientWidth*2;
        }
    }, [selectedDate])

    useLayoutEffect(() => {
        const viewport = viewportWeeksRef.current;
        if (viewport) {
            viewport.scrollLeft = viewport.clientWidth;
        }
        // console.log("change");
    }, [selectedWeek])


    
    return (
        <div id="schedule-page-content">
            <div id="schedule-page-head">
                <span id="schedule-page-label">Расписание</span>
                <div id="week-info">
                    <button id="week-number-button">{selectedWeekNum} нед, {SHORT_WEEKS[selectedWeekNum%2==1 ? "ch" : "zn"]}</button>
                    <button id="month-name-button">{MONTHS[selectedDate.getMonth()]}</button>
                </div>
            </div>
            <div id="weeks-viewport"
                ref={viewportWeeksRef}
                onScrollEnd={(event) => {
                    const viewport = event.currentTarget;
                    const pageWidth = viewport.clientWidth;

                    if (pageWidth === 0) return;

                    const pageIndex = Math.round(viewport.scrollLeft / pageWidth);
                    const pageOffset = pageIndex - 1;

                    if (pageOffset !== 0)
                        shiftWeek(pageOffset);
                }}>
                <WeekBlock weekStart={prevWeek} activeDate={selectedDate} onDayClick={toggleDayClick}/>
                <WeekBlock weekStart={selectedWeek} activeDate={selectedDate} onDayClick={toggleDayClick}/>
                <WeekBlock weekStart={nextWeek} activeDate={selectedDate} onDayClick={toggleDayClick}/>
            </div>
            <div id="horizontal-schedule-viewport"
                ref={viewportScheduleRef}
                
                onScrollEnd={(event) => {
                    const viewport = event.currentTarget;
                    const pageWidth = viewport.clientWidth;
                    if (pageWidth === 0) return;

                    const pageIndex = Math.round(viewport.scrollLeft / pageWidth);
                    
                    const pageOffset = pageIndex - 2;

                    if (pageOffset !== 0)
                        shiftDay(pageOffset);
            }}>
                
                <ScheduleOneDay lessons={
                    mapDayLessons(getLessonsForDate(prev2Date, chSchedule, znSchedule), prev2Date)
                }/>
                <ScheduleOneDay lessons={
                    mapDayLessons(getLessonsForDate(prevDate, chSchedule, znSchedule), prevDate)
                }/>
                <ScheduleOneDay lessons={
                    mapDayLessons(getLessonsForDate(selectedDate, chSchedule, znSchedule), selectedDate)
                }/>
                <ScheduleOneDay lessons={
                    mapDayLessons(getLessonsForDate(nextDate, chSchedule, znSchedule), nextDate)
                }/>
                <ScheduleOneDay lessons={
                    mapDayLessons(getLessonsForDate(next2Date, chSchedule, znSchedule), next2Date)
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