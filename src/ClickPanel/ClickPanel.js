import React, { useState, useEffect } from 'react';
import './ClickPanel.css';
import forest from './img/forest.jpg';
import wizard from "../BotPanel/img/wizard.png";


const ClickPanel = () => {
    // Состояние для счётчика
    const [count, setCount] = useState(0);

    // Состояние для здоровья, начальное значение 10
    const [health, setHealth] = useState(10);
    // Состояние для максимального здоровья (которое будет увеличиваться в 2 раза)
    const [maxHealth, setMaxHealth] = useState(10);

    // Состояние для энергии, начальное значение 100
    const [energy, setEnergy] = useState(100);

    // Функция для увеличения счётчика и уменьшения здоровья
    const handleClick = () => {
        if (energy > 0) {
            // Если энергия больше 0, выполняем действия
            if (health > 0) {
                setHealth(health - 1);  // Уменьшаем здоровье
            } else {
                setMaxHealth(maxHealth * 2);  // Когда здоровье = 0, увеличиваем максимальное здоровье в 2 раза
                setHealth(maxHealth * 2);     // Устанавливаем новое здоровье равным максимальному
            }
            setEnergy(energy - 1);  // Каждый клик уменьшает энергию на 10
            setCount(count + 1);  // Увеличиваем счётчик
        }
    };

    // Таймер для увеличения энергии каждую минуту
    useEffect(() => {
        const energyTimer = setInterval(() => {
            setEnergy(prevEnergy => {
                if (prevEnergy < 100) {  // Максимум энергии = 100
                    return prevEnergy + 1;
                }
                return prevEnergy;  // Энергия не увеличивается, если она уже на максимуме
            });
        }, 120000);  // 120000 миллисекунд = 2 минуты

        // Очищаем таймер при размонтировании компонента
        return () => clearInterval(energyTimer);
    }, []);

    return (
        <div className="ClickPanel">
            <img src={forest} className="backround-image" />
            <div>Счётчик: {count}</div>
            <div>Здоровье: {health}</div>
            <div>Энергия: {energy}</div>
            <button className="TapButton" onClick={handleClick} disabled={energy <= 0}>
                123
            </button>
        </div>
    );
};

export default ClickPanel;
