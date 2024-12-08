import React from 'react';
import './BotPanel.css';
import wizard from './img/wizard.png';

const BotPanel = ({ upgradeDamage, upgradeMaxEnergy, upgradeEnergyRecoverySpeed, handlePanelChange }) => {
    return (
        <div className={'BotPanel'}>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Приключение")}>
                <span className="button-text">Монстры</span>
                <img src={wizard} alt="Приключение" className="button-image" />
            </button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Кузнец")}>Кузнец</button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Лавка")}>Волшебник</button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Задание")}>Квест</button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Лидеры")}>TOP</button>
        </div>
    );
};

export default BotPanel;
