import { useEffect, useState } from "react";
import { HomeworkDisciplineBlock, HomeworkWeekBlock } from "./HomeworkWeekBlock.js";
import type {HomeworkDisciplineBlockProps} from "./HomeworkWeekBlock.js"
import type { HomeworkUI } from "../../types/homework.js";
import { getAllSchedule, toggleHomeworkDone } from "../../lib/api/homework.js";
import { homeworkDtoListToHomeworkUI } from "../../mappers/homework.js";
import { ClickContext } from "./ClickContext.js";


// const HomeworkDisciplineBlockMock: HomeworkDisciplineBlockProps = {
//     name: "Математический анализ",
//     homeworkList: [
//         {
//             discipline: "Математический анализ",
//             text: "Первое задание",
//             deadline: new Date(),
//             deadlineWeek: 13,
//             lessonType: "seminar",
//             done: false,
//             kind: "regular"
//         },
//         {
//             discipline: "Математический анализ",
//             text: "Второе задание",
//             deadline: new Date(),
//             deadlineWeek: 13,
//             lessonType: "seminar",
//             done: true,
//             kind: "regular"
//         }
//     ]
// }



export function ScreenHomework() {

    const [homeworkList, setHomeworkList] = useState<HomeworkUI[]>([]);

    useEffect(() => {
        getAllSchedule(1).then(data => {
            setHomeworkList(homeworkDtoListToHomeworkUI(data));

            console.log(homeworkDtoListToHomeworkUI(data));
        })
    }, [])

    const byWeek = Map.groupBy(homeworkList, (h) => h.deadlineWeek);
    
    const handleToggleHomeworkClick = (homeworkId: number) => {
        toggleHomeworkDone(homeworkId).then(data => {
            setHomeworkList(homeworkDtoListToHomeworkUI(data));
        })
    }


    return (
        <ClickContext.Provider value = {handleToggleHomeworkClick}>
        <div className="homework-viewport">
            {
                [...byWeek].map(([week, items]) => (
                    <HomeworkWeekBlock key={"week"+week} homeworkList={items}/>
                ))
            }
        </div>
        </ClickContext.Provider>
    );
}