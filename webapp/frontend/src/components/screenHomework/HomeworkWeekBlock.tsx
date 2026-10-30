import type { HomeworkUI, HomeworkWeekList } from "../../types/homework.js"

type HomeworkWeekBlockProps = {
    homeworkList: HomeworkWeekList
}

type HomeworkDisciplineBlockProps = {
    name: string,
    homeworkList: HomeworkUI[]
}

type OneHomeworkTileProps = {
    homework: HomeworkUI
}

type HomeworkCheckBoxButtonProps = {
    isActive: boolean
}




function HomeworkCheckBoxButton({isActive}: HomeworkCheckBoxButtonProps) {
    const squareClassName = isActive ? "homework-check-box active" : "homework-check-box"

    return (
        <button className="homework-check-box-button">
            <div className={squareClassName}></div>
        </button>
    );
}

export function OneHomeworkTile({homework}: OneHomeworkTileProps) {
    return (
        <div>
            <HomeworkCheckBoxButton isActive={true}/>
            <span>{homework.lessonType}</span>
            <span>{homework.text}</span>
        </div>
    );
}

export function HomeworkDisciplineBlock({name, homeworkList}: HomeworkDisciplineBlockProps) {
    
    const listByDeadline = new Map<string,HomeworkUI[]>();

    homeworkList.forEach((homework) => {
        const deadlineDate = new Date(homework.deadline);
        deadlineDate.setHours(0,0,0,0);

        const key = deadlineDate.toISOString();
        const items = listByDeadline.get(key);

        if (items) {
            items.push(homework);
        }
        else {
            listByDeadline.set(key, [homework]);
        }
    })
    
    
    return (
        <div>
            <span>{name}</span>
            <span></span>
            <OneHomeworkTile homework={homeworkList[0]}/>
        </div>
    );
}

export function HomeworkWeekBlock({homeworkList}: HomeworkWeekBlockProps) {
    return (
        <div>
            <span>НЕДЕЛЯ 5</span>
            <div>
                {<HomeworkDisciplineBlock {...HomeworkDisciplineBlockMock}/>}
            </div>
        </div>
    );
}