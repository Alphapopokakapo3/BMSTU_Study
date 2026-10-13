const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

console.log(tg.themeParams);





function createLesson(data) {
    const template = document.getElementById("lesson-template");
    const clone = template.content.cloneNode(true);

    const card = clone.querySelector(".lesson-card");

    clone.querySelector(".lesson-card-time").textContent = data.time;
    clone.querySelector(".lesson-card-audience").textContent = data.audience;
    clone.querySelector(".lesson-card-name").textContent = data.name;

    const typeEl = clone.querySelector('.lesson-card-type');
    typeEl.textContent = data.typeText;
    typeEl.classList.add(data.type);

    clone.querySelector(".lesson-card-teachers").textContent = data.teachersText;
    clone.querySelector(".lesson-card-homework").textContent = data.homeworkText;
    clone.querySelector(".lesson-card-break-text").textContent = data.breakText;

    if (data.isActive) {
        clone.querySelector(".lesson-card-time").classList.add('active-now');
    }
    if (data.isBreak) {
        clone.querySelector(".lesson-card-break-text").classList.add('active-now');
    }
    if (data.isLast) {
        clone.querySelector(".lesson-card-break-text").classList.add('last');
    }
    
    if (data.isHomework) {
        clone.querySelector(".lesson-card-homework").classList.remove('hidden')
    }
            
    return clone;
}

function createWeekDay(data) {
    const template = document.getElementById("week-day-template");
    const clone = template.content.cloneNode(true);
            
    const day = clone.querySelector(".week-day");

    clone.querySelector(".week-day-abbr").textContent = data.dayAbbr;
    clone.querySelector(".day-number").textContent = data.dayNumber;

    if (data.isActive) {
        clone.querySelector(".week-day-button").classList.add('active')
        clone.querySelector(".day-number").classList.add('active')
    }

    return clone;
}

function createWeek(data) {
    const week = document.createElement('div');
    week.className = "week-view";
    week.classList.add('slide')

    data.days.forEach(element => {
        week.append(createWeekDay(element));
    });

    return week;
}



function generateSchedule() {
    
}
