import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./Header/Header";
import BotPanel from "./BotPanel/BotPanel"
import ClickPanel from  "./ClickPanel/ClickPanel"


const tg=window.Telegram.WebApp;

function App() {
    const {onClose}=useTelegram();

  useEffect(()=>{
    tg.ready();
      },[])

  return (
    <div className="App">
    <Header/>
    <button onClick={onClose}>закрыть</button>
        <ClickPanel/>
        <BotPanel/>
    </div>
  );
}

export default App;
