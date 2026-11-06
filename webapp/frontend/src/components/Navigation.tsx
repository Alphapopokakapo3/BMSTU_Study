import { Link, NavLink } from "react-router";


type NavigationButtonProps = {
    id: string,
    name: string
}

type NavigationBarProps = {
    currentPage: string,
    onPageClick: (newPage: string) => void
}


function NavigationButton({id, name}: NavigationButtonProps) {
    return (
        <button
        id={id}
        className="nav-button">
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
        <nav className="navigation" >
            <NavLink to="/schedule" className={({isActive}) => isActive ? "active-now" : ""}>
                <NavigationButton name="Расписание" id="btn-schedule"/>
            </NavLink>
            <NavLink to="/homework" className={({isActive}) => isActive ? "active-now" : ""}>
                <NavigationButton name="Задания" id="btn-homework"/>
            </NavLink>

            <NavLink to="/new_homework" className={({isActive}) => isActive ? "active-now": ""}>
                <NavigationButton name="Создать" id="btn-new-homework"/>
            </NavLink>

            <NavLink to="/profile" className={({isActive}) => isActive ? "active-now" : ""}>
                <NavigationButton name="Профиль" id="btn-profile"/>
            </NavLink>
        </nav>
        );
}