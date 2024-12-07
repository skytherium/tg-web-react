import React, { useState, useEffect } from 'react';
import './ClickPanel.css';
import forest from './img/forest.jpg'; // Фоновое изображение
import monster from './img/monster.png'; // Изображение монстра
import heartIcon from './img/health.png'; // Изображение сердца
import coin from './img/gold.png'; // Изображение монетки

const ClickPanel = ({ damage, maxEnergy, energyRecoverySpeed, setDamage, setMaxEnergy, setEnergyRecoverySpeed, activePanel }) => {
    const [count, setCount] = useState(0); // Счётчик кликов
    const [health, setHealth] = useState(20); // Текущее здоровье
    const [maxHealth, setMaxHealth] = useState(20); // Максимальное здоровье
    const [energy, setEnergy] = useState(100); // Энергия
    const [lvl, setLvl] = useState(0); // Уровень

    const [damageUpgradeCost, setDamageUpgradeCost] = useState(10); // Стоимость улучшения урона
    const [maxEnergyUpgradeCost, setMaxEnergyUpgradeCost] = useState(15); // Стоимость улучшения макс. энергии
    const [energyRecoverySpeedUpgradeCost, setEnergyRecoverySpeedUpgradeCost] = useState(20); // Стоимость улучшения восстановления энергии

    const handleClick = () => {
        if (energy > 0) {
            if (health > 1) {
                setHealth(prevHealth => Math.max(prevHealth - damage, 0)); // Уменьшаем здоровье с учетом урона
            } else {
                setMaxHealth(prevMaxHealth => {
                    const newMaxHealth = prevMaxHealth * 2; // Увеличиваем максимальное здоровье
                    setHealth(newMaxHealth); // Полностью восстанавливаем здоровье
                    return newMaxHealth;
                });

                // Увеличиваем lvl только один раз, когда здоровье восстанавливается
                setLvl(prevLvl => prevLvl + 1);
            }
            setEnergy(prevEnergy => Math.max(prevEnergy - 1, 0)); // Уменьшаем энергию
            setCount(count + damage); // Увеличиваем счётчик кликов
        }
    };


    useEffect(() => {
        const energyTimer = setInterval(() => {
            setEnergy(prevEnergy => Math.min(prevEnergy + 1, maxEnergy)); // Восстанавливаем энергию до maxEnergy
        }, energyRecoverySpeed);

        return () => clearInterval(energyTimer);
    }, [maxEnergy, energyRecoverySpeed]);

    const healthPercentage = (health / maxHealth) * 100;

    // Логика для покупки улучшений
    const handleDamageUpgrade = () => {
        if (count >= damageUpgradeCost) {
            setDamage(damage + 1); // Улучшаем урон
            setCount(count - damageUpgradeCost); // Снимаем клики
            setDamageUpgradeCost(prevCost => Math.ceil(prevCost * 1.5)); // Увеличиваем цену улучшения урона
        }
    };

    const handleMaxEnergyUpgrade = () => {
        if (count >= maxEnergyUpgradeCost) {
            setMaxEnergy(maxEnergy + 20); // Увеличиваем макс. энергию
            setCount(count - maxEnergyUpgradeCost); // Снимаем клики
            setMaxEnergyUpgradeCost(prevCost => Math.ceil(prevCost * 1.5)); // Увеличиваем цену улучшения макс. энергии
        }
    };

    const handleEnergyRecoverySpeedUpgrade = () => {
        if (count >= energyRecoverySpeedUpgradeCost) {
            setEnergyRecoverySpeed(energyRecoverySpeed - 10000); // Ускоряем восстановление энергии
            setCount(count - energyRecoverySpeedUpgradeCost); // Снимаем клики
            setEnergyRecoverySpeedUpgradeCost(prevCost => Math.ceil(prevCost * 1.5)); // Увеличиваем цену улучшения восстановления энергии
        }
    };

    return (
        <div className="ClickPanel">
            <img src={forest} className="background-image" alt="Background" />
            <div className="info-player">
                <div className="coin-panel">
                    <img src={coin} className="coin-icon" alt="Coin" />
                    <div className="coin-count">Монеты: {count}</div>
                </div>

                <div className="level-panel">
                    <div className="lvl-text">Уровень: {lvl}</div>
                </div>
            </div>


            <div className="health-bar-container">
                <img src={heartIcon} className="heart-icon" alt="Heart" />
                <div className="health-bar">
                    <div className="health-bar-fill" style={{ width: `${healthPercentage}%` }} />
                    <span className="health-text">{health}/{maxHealth}</span>
                </div>
            </div>

            <div className="energy-sword-container">
                <div className="energy-sword">
                    <div className="energy-sword-fill" style={{ width: `${(energy / maxEnergy) * 100}%` }} />
                    <span className="energy-text">{energy}/{maxEnergy}</span>
                </div>
            </div>

            <img
                src={monster}
                className="clickable-image"
                alt="Monster"
                onClick={handleClick}
                style={{ cursor: energy > 0 ? 'pointer' : 'not-allowed' }}
            />


            {activePanel === "Кузнец" && (
                <div className="BlacksmithPanel">
                    <h2>Панель Кузнеца</h2>
                    <div>
                        <p>Урон за клик: {damage}</p>
                        <button onClick={handleDamageUpgrade}>Увеличить урон ({damageUpgradeCost} кликов)</button>
                    </div>
                    <div>
                        <p>Макс. энергия: {maxEnergy}</p>
                        <button onClick={handleMaxEnergyUpgrade}>Увеличить макс. энергию ({maxEnergyUpgradeCost} кликов)</button>
                    </div>
                    <div>
                        <p>Скорость восстановления энергии: {energyRecoverySpeed / 1000} сек</p>
                        <button onClick={handleEnergyRecoverySpeedUpgrade}>Ускорить восстановление энергии ({energyRecoverySpeedUpgradeCost} кликов)</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClickPanel;
