import React from 'react';
import './BotPanel.css';
import wizard from './img/wizard.png';
import map from './img/map.png';
import anvil from './img/anvil.png';
import top from './img/top.png';
import kvest from './img/kvest.png';

const BotPanel = ({ upgradeDamage, upgradeMaxEnergy, upgradeEnergyRecoverySpeed, handlePanelChange }) => {
    return (
        <div className={'BotPanel'}>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Приключение")}>
                <span className="button-text">Монстры</span>
                <img src={map} alt="Приключение" className="button-image" />
            </button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Кузнец")}>
                <span className="button-text">Кузнец</span>
                <img src={anvil} alt="Приключение" className="button-image" />
            </button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Лавка")}>
                <span className="button-text">Волшебник</span>
                <img src={wizard} alt="Приключение" className="button-image" />
            </button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Задание")}>
                <span className="button-text">Квесты</span>
                <img src={kvest} alt="Приключение" className="button-image" />
            </button>
            <button className="BotPanel_button" onClick={() => handlePanelChange("Лидеры")}>
                <span className="button-text">TOP</span>
                <img src={top} alt="Приключение" className="button-image" />
            </button>
        </div>
    );
};

export default BotPanel;
