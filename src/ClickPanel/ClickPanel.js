import React, { useState, useEffect } from 'react';
import './ClickPanel.css';
import axios from 'axios'; // Импортируем axios для HTTP запросов

import forest from './img/forest.jpg';
import monster from './img/monster.png';
import heartIcon from './img/health.png';
import coin from './img/gold.png';

const ClickPanel = ({ damage, maxEnergy, energyRecoverySpeed, setDamage, setMaxEnergy, setEnergyRecoverySpeed, activePanel }) => {
    const [count, setCount] = useState(0);
    const [health, setHealth] = useState(20);
    const [maxHealth, setMaxHealth] = useState(20);
    const [energy, setEnergy] = useState(100);
    const [lvl, setLvl] = useState(0);

    const [damageUpgradeCost, setDamageUpgradeCost] = useState(10);
    const [maxEnergyUpgradeCost, setMaxEnergyUpgradeCost] = useState(15);
    const [energyRecoverySpeedUpgradeCost, setEnergyRecoverySpeedUpgradeCost] = useState(20);

    const [questProgress, setQuestProgress] = useState({
        level: 0,
        coinCount: 0,
        targetCoins: 100,
    });
    const [levelQuestProgress, setLevelQuestProgress] = useState({
        currentLevel: 5,
        reward: 50,
    });

    const [questReward, setQuestReward] = useState(null);
    const [rewardAmount, setRewardAmount] = useState(100);
    const [showRewardMessage, setShowRewardMessage] = useState(false);

    // Получаем данные с сервера
    useEffect(() => {
        axios.get('http://localhost:5000/api/user-data')
            .then(response => {
                const data = response.data;
                setCount(data.coin_count);
                setHealth(data.health);
                setMaxHealth(data.max_health);
                setEnergy(data.energy);
                setMaxEnergy(data.max_energy);
                setLvl(data.level);
            })
            .catch(err => console.error(err));
    }, []);

    // Сохраняем данные на сервере
    const updateUserData = () => {
        const data = { count, lvl, health, maxHealth, energy, maxEnergy };
        axios.post('http://localhost:5000/api/update-user', data)
            .then(response => console.log(response.data.message))
            .catch(err => console.error(err));
    };

    const handleClick = () => {
        if (energy > 0) {
            if (health > 1) {
                setHealth(prevHealth => Math.max(prevHealth - damage, 0));
            } else {
                setMaxHealth(prevMaxHealth => {
                    const newMaxHealth = prevMaxHealth * 2;
                    setHealth(newMaxHealth);
                    return newMaxHealth;
                });
                setLvl(prevLvl => prevLvl + 1);
            }
            setEnergy(prevEnergy => Math.max(prevEnergy - 1, 0));
            setCount(count + damage);

            setQuestProgress(prevProgress => ({
                ...prevProgress,
                coinCount: prevProgress.coinCount + damage,
            }));

            updateUserData(); // Отправляем обновленные данные на сервер
        }
    };

    useEffect(() => {
        const energyTimer = setInterval(() => {
            setEnergy(prevEnergy => Math.min(prevEnergy + 1, maxEnergy));
        }, energyRecoverySpeed);

        return () => clearInterval(energyTimer);
    }, [maxEnergy, energyRecoverySpeed]);

    // Установите логики улучшений, наград и другие события так же, как в вашем текущем коде.

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
                    <div className="health-bar-fill" style={{ width: `${(health / maxHealth) * 100}%` }} />
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

            {/* Остальной код с панелями и наградами */}
        </div>
    );
};

export default ClickPanel;
