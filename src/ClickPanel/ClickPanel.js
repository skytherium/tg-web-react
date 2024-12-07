import React, { useState, useEffect } from 'react';
import './ClickPanel.css';
import forest from './img/forest.jpg'; // Фоновое изображение
import monster from './img/monster.png'; // Изображение монстра
import heartIcon from './img/health.png'; // Изображение сердца

const ClickPanel = () => {
    // Состояния
    const [count, setCount] = useState(0); // Счётчик
    const [health, setHealth] = useState(20); // Текущее здоровье
    const [maxHealth, setMaxHealth] = useState(20); // Максимальное здоровье
    const [energy, setEnergy] = useState(100); // Энергия

    // Обработчик клика по монстру
    const handleClick = () => {
        if (energy > 0) {
            if (health > 0) {
                setHealth(prevHealth => Math.max(prevHealth - 1, 0)); // Уменьшаем здоровье
            } else {
                setMaxHealth(prevMaxHealth => {
                    const newMaxHealth = prevMaxHealth * 2; // Увеличиваем максимальное здоровье
                    setHealth(newMaxHealth); // Полностью восстанавливаем здоровье
                    return newMaxHealth;
                });
            }
            setEnergy(energy - 1); // Уменьшаем энергию
            setCount(count + 1); // Увеличиваем счётчик
        }
    };

    // Таймер для восстановления энергии
    useEffect(() => {
        const energyTimer = setInterval(() => {
            setEnergy(prevEnergy => Math.min(prevEnergy + 1, 100)); // Восстанавливаем энергию до 100 максимум
        }, 120000); // Каждые 2 минуты

        return () => clearInterval(energyTimer); // Очищаем таймер при размонтировании
    }, []);

    // Расчёт ширины полоски здоровья
    const healthPercentage = (health / maxHealth) * 100;

    return (
        <div className="ClickPanel">
            {/* Фоновое изображение */}
            <img src={forest} className="background-image" alt="Background" />

            {/* Полоска здоровья и сердечко */}
            <div className="health-bar-container">
                <img src={heartIcon} className="heart-icon" alt="Heart" />
                <div className="health-bar">
                    <div
                        className="health-bar-fill"
                        style={{ width: `${healthPercentage}%` }}
                    />
                    <span className="health-text">{health}/{maxHealth}</span>
                </div>
            </div>

            {/* Монстр для кликов */}
            <img
                src={monster}
                className="clickable-image"
                alt="Monster"
                onClick={handleClick}
                style={{ cursor: energy > 0 ? 'pointer' : 'not-allowed' }}
            />

            {/* Панель информации */}
            <div className="info">
                <div>Счётчик: {count}</div>
                <div>Энергия: {energy}</div>
            </div>
        </div>
    );
};

export default ClickPanel;
