import { Link, NavLink } from "react-router";
import calendarIcon from '../assets/calendar.svg';
import listIcon from '../assets/list.svg';
import pencilIcon from '../assets/pencil.svg'
import userIcon from '../assets/user.svg'

type NavigationButtonProps = {
    id: string,
    name: string,
    icon: string
}

type NavigationBarProps = {
    currentPage: string,
    onPageClick: (newPage: string) => void
}


function NavigationButton({id, name, icon}: NavigationButtonProps) {
    return (
        <button
        id={id}
        className="nav-button">
            <div className="nav-button-div">
              <img
                src={icon}
                width={24}
                height={24}
                alt={name}
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
                <NavigationButton name="Расписание" id="btn-schedule" icon={calendarIcon}/>
            </NavLink>
            <NavLink to="/homework" className={({isActive}) => isActive ? "active-now" : ""}>
                <NavigationButton name="Задания" id="btn-homework" icon={listIcon}/>
            </NavLink>

            <NavLink to="/new_homework" className={({isActive}) => isActive ? "active-now": ""}>
                <NavigationButton name="Создать" id="btn-new-homework" icon={pencilIcon}/>
            </NavLink>

            <NavLink to="/profile" className={({isActive}) => isActive ? "active-now" : ""}>
                <NavigationButton name="Профиль" id="btn-profile" icon={userIcon}/>
            </NavLink>
        </nav>
        );
}