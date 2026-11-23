import {useEffect, useState} from 'react';
import { NavigationBar } from './components/Navigation.js';
import { ScreenSchedule } from './components/screenSchedule/ScreenSchedule.js';
import {ScreenComp} from './components/ScreenComp.js';
import { getInitData, authorizationByInitData } from './lib/api/global.js';
import { HashRouter, Route } from 'react-router';
import type { LessonDto } from './types/api.js';
import { getSchedule } from './lib/api/schedule.js';



function App() {

    const [currentPage, changePage] = useState("page-schedule");

    // App data
    const [chSchedule, setChSchedule] = useState<LessonDto[][]>([[], [], [], [], [], [], []]);
    const [znSchedule, setZnSchedule] = useState<LessonDto[][]>([[], [], [], [], [], [], []]);

    // const [currentUser, setCurrentUser] = useStat

    const [scheme, setScheme] = useState<string>(window.Telegram?.WebApp?.colorScheme ?? "light");
    
    window.Telegram?.WebApp?.onEvent('themeChanged', () => {
      setScheme(window.Telegram?.WebApp?.colorScheme ?? "light");
    })

    useEffect(() => {
      if (scheme == "dark")
        document.body.classList.add("dark");
      else
        document.body.classList.remove("dark");
    }, [scheme])


    useEffect(() => {
    
        getSchedule().then(data => {
            const newChSchedule: LessonDto[][] = [[],[],[],[],[],[],[]];
            const newZnSchedule: LessonDto[][] = [[],[],[],[],[],[],[]];

            
            data.schedule.forEach(el => {
                if (el.week == "ch" || el.week == "all") {
                    newChSchedule[el.day-1]?.push(el);
                }
                if (el.week == "zn" || el.week == "all") {
                    newZnSchedule[el.day-1]?.push(el);
                }
                
            })

            setChSchedule(newChSchedule);
            setZnSchedule(newZnSchedule);
            
        });}, []);



    const onPageClick = (newPage: string) => {
      if (newPage !== currentPage)
        changePage(newPage);
    }

    useEffect(() => {
      window.Telegram?.WebApp?.expand()

      getInitData().then(data => {
        authorizationByInitData(data);
      });
    }, [])
    
    return (<>
  <meta charSet="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  />
  <meta name="format-detection" content="telephone=no" />
  
  <div className="page-layout">
    <main className="content">
      <ScreenComp currentPage={currentPage} 
        chSchedule={chSchedule}
        znSchedule={znSchedule}/>
    </main>
      <NavigationBar currentPage={currentPage} onPageClick={onPageClick}/>
  </div>
</>
);
}

export default App;