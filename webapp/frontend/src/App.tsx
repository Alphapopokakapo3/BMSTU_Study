import {useState} from 'react';
import { NavigationBar } from './components/Navigation.js';
import { ScreenSchedule } from './components/screenSchedule/ScreenSchedule.js';
import { ScreenComp } from './components/ScreenComp.js';





function App() {

    const [currentPage, changePage] = useState("page-schedule");

    const onPageClick = (newPage: string) => {
      if (newPage !== currentPage)
        changePage(newPage);
    }
    
    return (<>
  <meta charSet="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  />
  <meta name="format-detection" content="telephone=no" />
  <title>Электронный дневник</title>
  <div className="page-layout">
    <main className="content">
      <ScreenComp currentPage={currentPage}/>
    </main>
      <NavigationBar currentPage={currentPage} onPageClick={onPageClick}/>
      {/*    <nav className="navigation">
      <button
        data-page="page-schedule"
        id="btn-schedule"
        className="nav-button"
      >
        <div className="nav-button-div">
          <img
            src="{{ url_for('static', filename='Schedule24.svg') }}"
            width={24}
            height={24}
            alt="Расписание"
            className="nav-button-image"
          />
          <h5 className="nav-button-text">Расписание</h5>
        </div>
      </button>
      <button
        data-page="page-homework"
        id="btn-homework"
        className="nav-button"
      >
        <div className="nav-button-div">
          <img
            src="{{ url_for('static', filename='Schedule24.svg') }}"
            width={24}
            height={24}
            alt="Д/З"
            className="nav-button-image"
          />
          <h5 className="nav-button-text">Д/З</h5>
        </div>
      </button>
      <button data-page="page-profile" id="btn-profile" className="nav-button">
        <div className="nav-button-div">
          <img
            src="{{ url_for('static', filename='Schedule24.svg') }}"
            width={24}
            height={24}
            alt="Профиль"
            className="nav-button-image"
          />
          <h5 className="nav-button-text">Профиль</h5>
        </div>
      </button>
    </nav> */}
  </div>
</>
);
}

export default App;