import './App.css';
import React, { useState, useEffect } from 'react';
import BotPanel from './BotPanel/BotPanel';
import ClickPanel from './ClickPanel/ClickPanel';

const tg = window.Telegram.WebApp;

function App() {

    useEffect(() => {
        tg.ready();
    }, []);

    const [damage, setDamage] = useState(1);
    const [maxEnergy, setMaxEnergy] = useState(100);
    const [energyRecoverySpeed, setEnergyRecoverySpeed] = useState(120000);
    const [activePanel, setActivePanel] = useState(null);

    const handlePanelChange = (panelName) => {
        setActivePanel(panelName);
    };

    return (
        <div className="App">
            <BotPanel
                handlePanelChange={handlePanelChange}
            />
            <ClickPanel
                damage={damage}
                maxEnergy={maxEnergy}
                energyRecoverySpeed={energyRecoverySpeed}
                setDamage={setDamage}
                setMaxEnergy={setMaxEnergy}
                setEnergyRecoverySpeed={setEnergyRecoverySpeed}
                activePanel={activePanel}
            />
        </div>
    );
}


export default App;
