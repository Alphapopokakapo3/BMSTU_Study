import { useEffect, useState } from "react";
import { Button, Calendar, InputField, Select, Slider, SubmitButton, WeekSelect } from "../Custom.js";
import { currentWeek } from "../../lib/scheduleUtils.js";

const lessonTypeButtonMap = new Map<string, string>([["seminar", "Семинар"], ["lecture", "Лекция"], ["lab", "Лаб."]])
const homeworkTypeButtonMap = new Map<string, string>([['regular', 'Текущее'], ['stand', 'Стендовое']])

export function ScreenNewHomework() {

    const [lessonTypeState, setLessonTypeState] = useState<string>("seminar");
    const [disciplineState, setDisciplineState] = useState<string>("");
    const [weekState, setWeekState] = useState<number>(currentWeek())
    const [homeworkTypeState, setHomeworkTypeState] = useState<string>("regular")
    const [homeworkTextState, setHomeworkTextState] = useState<string>("");

    const [disciplineVariants, setDisciplineVariants] = useState<string[]>(["Hello", "hello2"]);


    const [allValidated, setAllValidated] = useState<boolean>(false);

    const validateAll = () => {
        setAllValidated(!allValidated);
    }

    useEffect(() => {
        validateAll()
    }, [disciplineState, lessonTypeState, weekState, homeworkTypeState, homeworkTextState])

    return (
        <div className="screen-new-homework">
            <div className="new-homework-form">
                <div className="new-homework-form-item">
                    <span className="new-homework-form-item-title">Дисциплина</span>
                    <Select variants={disciplineVariants} state={disciplineState} setState={setDisciplineState}/>
                </div>
                <div className="new-homework-form-item">
                    <span className="new-homework-form-item-title">Тип занятия</span>
                    <Slider buttonList={lessonTypeButtonMap} state={lessonTypeState} setState={setLessonTypeState} />
                </div>
                <div className="new-homework-form-item new-homework-date-row">
                    <div className="new-homework-week-item">
                        <span className="new-homework-form-item-title">Неделя</span>
                        <WeekSelect weeksList={[currentWeek() - 1, currentWeek(), currentWeek()+1]} state={weekState} setState={setWeekState}/>
                    </div>
                    <div className="new-homework-date-item">
                        <span className="new-homework-date-title">Дата</span>
                        <Calendar/>
                    </div>
                    <Button aClass="near-lesson-button" text="Ближайшее занятие" onClick={() => {}}/>
                </div>
                <div className="new-homework-form-item">
                    <span className="new-homework-form-item-title">Тип домашнего задания</span>
                    <Slider buttonList={homeworkTypeButtonMap} state={homeworkTypeState} setState={setHomeworkTypeState}/>
                </div>
                <div className="new-homework-form-item">
                    <span className="new-homework-form-item-title">Текст домашнего задания</span>
                    <InputField/>
                </div>
                <SubmitButton text="Опубликовать" isActive={allValidated} onClick={validateAll}/>
            </div>
        </div>
    );
}