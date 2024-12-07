import React from 'react';
import './BotPanel.css';
import wizard from './img/wizard.png';

const BotPanel = ({ upgradeDamage, upgradeMaxEnergy, upgradeEnergyRecoverySpeed, handlePanelChange }) => {
    return (
        <div className={'BotPanel'}>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Приключение")}>
                <span className="button-text">Приключение</span>
                <img src={wizard} alt="Приключение" className="button-image" />
            </button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Кузнец")}>Кузнец</button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Лавка")}>Лавка волшебника</button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Задание")}>Задание</button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Лидеры")}>Лидеры</button>
        </div>
    );
};

export default BotPanel;
