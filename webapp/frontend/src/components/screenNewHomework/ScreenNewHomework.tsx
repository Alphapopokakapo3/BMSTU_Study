import { useState } from "react";
import { Button, Select, Slider, WeekSelect } from "../Custom.js";
import { currentWeek } from "../../lib/scheduleUtils.js";

const lessonTypeButtonMap = new Map<string, string>([["seminar", "Семинар"], ["lecture", "Лекция"], ["lab", "Лаб."]])

export function ScreenNewHomework() {

    const [lessonTypeState, setLessonTypeState] = useState<string>("seminar");
    const [disciplineState, setDisciplineState] = useState<string>("");
    const [weekState, setWeekState] = useState<number>(currentWeek())

    const [disciplineVariants, setDisciplineVariants] = useState<string[]>(["Hello", "hello2"]);


    return (
        <>
            <Slider buttonList={lessonTypeButtonMap} state={lessonTypeState} setState={setLessonTypeState} />
            <Select variants={disciplineVariants} state={disciplineState} setState={setDisciplineState}/>
            <Button aClass="near-lesson-button" text="Ближайшее занятие" onClick={() => {}}/>
            <WeekSelect weeksList={[currentWeek() - 1, currentWeek(), currentWeek()+1]} state={weekState} setState={setWeekState}/>
        </>
    );
}