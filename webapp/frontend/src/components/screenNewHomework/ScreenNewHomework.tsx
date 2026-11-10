import React, { useEffect, useState } from 'react';
import { Button, Calendar, InputField, Select, Slider, SubmitButton, WeekSelect } from "../Custom.js";
import { currentWeek } from "../../lib/scheduleUtils.js";

import type { LessonDto } from '../../types/api.js';
import { getLessonsForTwoWeeks } from './newHomeworkUtils.js';
import type { LessonType } from '../../types/general.js';

const lessonTypeButtonMap = new Map<string, string>([["seminar", "Семинар"], ["lecture", "Лекция"], ["lab", "Лаб."]])
const homeworkTypeButtonMap = new Map<string, string>([['regular', 'Текущее'], ['stand', 'Стендовое']])

type ScreenNewHomeworkProps = {
    chSchedule: LessonDto[][],
    znSchedule: LessonDto[][]
}

export function ScreenNewHomework({chSchedule, znSchedule}: ScreenNewHomeworkProps) {

    const [disciplineState, setDisciplineState] = useState<string>("");
    const [lessonTypeState, setLessonTypeState] = useState<LessonType>("seminar");
    const [weekState, setWeekState] = useState<number>(currentWeek())
    const [dateState, setDateState] = useState<string>(new Date().toISOString().slice(0, 10));
    const [homeworkTypeState, setHomeworkTypeState] = useState<string>("regular")
    const [homeworkTextState, setHomeworkTextState] = useState<string>("");
    
    const [disciplineVariants, setDisciplineVariants] = useState<string[]>(["Hello", "hello2"]);
    const [lessonTypeVariants, setLessonTypeVariants] = useState<Map<string, string>>(homeworkTypeButtonMap);

    useEffect(() => {
        const disciplineList = new Set<string>();

        for (const day of chSchedule) {
            for (const lesson of day) {
                disciplineList.add(lesson.discipline.fullName);
            }
        }

        for (const day of znSchedule) {
            for (const lesson of day) {
                disciplineList.add(lesson.discipline.fullName);
            }
        }
        
        setDisciplineVariants(Array.from(disciplineList));
    }, [chSchedule, znSchedule]);

    const [allValidated, setAllValidated] = useState<boolean>(false);

    const validateAll = () => {
        const vDiscipline = true;
        const vLessonType = true;
        const vWeek = true;
        const vDate = true;
        const vHomeworkType = true;
        const vText = homeworkTextState.length !== 0;
        
        
        setAllValidated(vDiscipline && vLessonType && vWeek && vDate && vHomeworkType && vText);
    }

    useEffect(() => {
        validateAll()
    }, [disciplineState, lessonTypeState, weekState, homeworkTypeState, homeworkTextState])

    const handleNearClick = () => {
        if (disciplineVariants.includes(disciplineState)) {
            const nextDate = getLessonsForTwoWeeks(
                chSchedule,
                znSchedule,
                disciplineState,
                lessonTypeState
            );

            if (nextDate !== undefined) {
                console.log(nextDate);
                setDateState(nextDate.slice(0,10));
            }
        }
        
    }

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
                        <Calendar state={dateState} setState={setDateState}/>
                    </div>
                    <Button aClass="near-lesson-button" text="Ближайшее занятие" onClick={handleNearClick}/>
                </div>
                <div className="new-homework-form-item">
                    <span className="new-homework-form-item-title">Тип домашнего задания</span>
                    <Slider buttonList={homeworkTypeButtonMap} state={homeworkTypeState} setState={setHomeworkTypeState}/>
                </div>
                <div className="new-homework-form-item">
                    <span className="new-homework-form-item-title">Текст домашнего задания</span>
                    <InputField state={homeworkTextState} setState={setHomeworkTextState}/>
                </div>
                <SubmitButton text="Опубликовать" isActive={allValidated} onClick={validateAll}/>
            </div>
        </div>
    );
}