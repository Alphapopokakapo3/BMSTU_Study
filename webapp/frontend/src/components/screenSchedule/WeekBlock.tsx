
const WEEK_DAYS = ["п", "в", "с", "ч", "п", "с", "в"]

type WeekDayProps = {
    n: number,
    date: Date,
    isActive: boolean,
    onClick: (date: Date) => void
}

type WeekBlockProps = {
    weekStart: Date,
    activeDate: Date,
    onDayClick: (date: Date) => void
}

function WeekDay({n, date, isActive, onClick}: WeekDayProps) {
    return (
    <div className="week-day">
        <span className="week-day-abbr">{WEEK_DAYS[n]}</span>
        <button className={isActive ? "week-day-button active" : "week-day-button"} onClick={() => onClick(date)}>
            <span className={isActive ? "day-number active" : "day-number"}>{date.getDate()}</span>
        </button>
    </div>
    )
}

export function WeekBlock({weekStart, activeDate, onDayClick}: WeekBlockProps, ) {
    const days = Array.from({length: 7}, (_, index) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + index);
        date.setHours(0,0,0,0);
        return date;
    })
    // console.log(activeDate.getDate(), activeDate.getMonth(), days);
    return (
        <div className="week-view slide">
            {
                days.map((date, index) => (
                    <WeekDay
                        key={date.toISOString()}
                        n={index}
                        date={date}
                        isActive={date.getDate() === activeDate.getDate() && date.getMonth() === activeDate.getMonth()}
                        onClick={onDayClick}
                    />
                ))
            }
        </div>
    )
}