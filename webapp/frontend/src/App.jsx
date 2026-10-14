import {useState} from 'react';


function NavigationButton({id, name, dataPage, isActive, onClick}) {
    return (
        <button
        data-page={dataPage}
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

function NavigationBar() {
    return (
        <nav className="navigation">
            <NavigationButton name="Расписание" data-page="page-schedule" id="btn-schedule"/>
            <NavigationButton name="Задания" data-page="page-homework" id="btn-homework"/>
            <NavigationButton name="Профиль" data-page="page-profile" id="btn-profile"/>
        </nav>
        );
}



function App() {

    const [currentPage, changePage] = useState("schedule");

    
    
    return (<>
  <meta charSet="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  />
  <meta name="format-detection" content="telephone=no" />
  <title>Электронный дневник</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}" />
  <div className="page-layout">
    <main className="content">
      <section className="page active-page" id="page-schedule"></section>
      <section className="page" id="page-homework"></section>
      <section className="page" id="page-profile"></section>
    </main>
      <NavigationBar/>
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