import React, { useState } from 'react';
import './BotPanel.css';
import wizard from './img/wizard.png';

const BotPanel = () => {
    const [activePanel, setActivePanel] = useState(null);

    const handleButtonClick = (panelName) => {
        if (panelName === "Приключение") {
            setActivePanel(null); // Сбросить все панели
        } else {
            setActivePanel(panelName); // Открыть соответствующую панель
        }
    };

    return (
        <div className={'BotPanel'}>
            <button className="BotPanel_button" onClick={() => handleButtonClick("Приключение")}>
                <span className="button-text">Приключение</span>
                <img src={wizard} alt="Приключение" className="button-image" />
            </button>
            <button className="BotPanel_button" onClick={() => handleButtonClick("Кузнец")}>Кузнец</button>
            <button className="BotPanel_button" onClick={() => handleButtonClick("Лавка")}>Лавка волшебника</button>
            <button className="BotPanel_button" onClick={() => handleButtonClick("Задание")}>Задание</button>
            <button className="BotPanel_button" onClick={() => handleButtonClick("Лидеры")}>Лидеры</button>

            {activePanel === "Кузнец" && (
                <div className="BlacksmithPanel">
                    <h2>Панель Кузнеца</h2>
                    <p>Здесь будут опции кузнеца...</p>
                </div>
            )}

            {activePanel === "Лавка" && (
                <div className="WizardShopPanel">
                    <h2>Панель Лавки Волшебника</h2>
                    <p>Здесь будут опции лавки...</p>
                </div>
            )}

            {activePanel === "Задание" && (
                <div className="QuestPanel">
                    <h2>Панель Задания</h2>
                    <p>Здесь будут задания...</p>
                </div>
            )}

            {activePanel === "Лидеры" && (
                <div className="LeadersPanel">
                    <h2>Панель Лидеров</h2>
                    <p>Здесь будут лидеры...</p>
                </div>
            )}
        </div>
    );
};

export default BotPanel;
