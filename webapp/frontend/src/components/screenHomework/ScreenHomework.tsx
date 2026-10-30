import { HomeworkDisciplineBlock, HomeworkWeekBlock } from "./HomeworkWeekBlock.js";



const HomeworkDisciplineBlockMock: HomeworkDisciplineBlockProps = {
    name: "Математический анализ",
    homeworkList: [
        {
            text: "Первое задание",
            deadline: new Date(),
            lessonType: "seminar",
            done: false
        },
        {
            text: "Второе задание",
            deadline: new Date(),
            lessonType: "seminar",
            done: true
        }
    ]
}

export function ScreenHomework() {
    return <HomeworkDisciplineBlock {...HomeworkDisciplineBlockMock}/>;
}