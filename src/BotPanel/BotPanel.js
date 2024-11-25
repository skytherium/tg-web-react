import React from 'react';
import './BotPanel.css';

const BotPanel = () => {
    return (
        <div className={'BotPanel'}>
            <button className="BotPanel_button">Приключение</button>
            <button className="BotPanel_button">Кузнец</button>
            <button className="BotPanel_button">Лавка волшебника</button>
            <button className="BotPanel_button">Задание</button>
            <button className="BotPanel_button">Лидеры</button>
        </div>
    );
};

export default BotPanel;