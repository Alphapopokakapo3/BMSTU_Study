

type NavigationButtonProps = {
    id: string,
    name: string,
    isActive: boolean,
    onClick: () => void
}

type NavigationBarProps = {
    currentPage: string,
    onPageClick: (newPage: string) => void
}


function NavigationButton({id, name, isActive, onClick}: NavigationButtonProps) {
    return (
        <button
        id={id}
        className={isActive ? "nav-button active-now" : "nav-button"}
        onClick={onClick}>
            <div className="nav-button-div">
              <img
                src=""
                width={24}
                height={24}
                alt="Расписание"
                className="nav-button-image"
              />
              <h5 className="nav-button-text">{name}</h5>
            </div>
        </button>
    ) ;
}

export function NavigationBar({currentPage, onPageClick}: NavigationBarProps) {
    return (
        <nav className="navigation">
            <NavigationButton name="Расписание" id="btn-schedule" isActive={currentPage=="page-schedule"} onClick={() => onPageClick("page-schedule")}/>
            <NavigationButton name="Задания" id="btn-homework" isActive={currentPage=="page-homework"} onClick={() => onPageClick("page-homework")}/>
            <NavigationButton name="Профиль" id="btn-profile" isActive={currentPage=="page-profile"} onClick={() => onPageClick("page-profile")}/>
        </nav>
        );
}