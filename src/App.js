import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./Header/Header";
import BotPanel from "./BotPanel/BotPanel"


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
        <BotPanel/>
    </div>
  );
}

export default App;
