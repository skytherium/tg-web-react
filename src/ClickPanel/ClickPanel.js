import React, { useState, useEffect } from 'react';
import './ClickPanel.css';
import forest from './img/forest.jpg'; // Фоновое изображение
import monster from './img/monster.png'; // Изображение монстра
import heartIcon from './img/health.png'; // Изображение сердца
import coin from './img/gold.png'; // Изображение монетки

const ClickPanel = ({ damage, maxEnergy, energyRecoverySpeed, setDamage, setMaxEnergy, setEnergyRecoverySpeed, activePanel }) => {
    const [count, setCount] = useState(0); // Счётчик кликов (монеты)
    const [health, setHealth] = useState(20); // Текущее здоровье
    const [maxHealth, setMaxHealth] = useState(20); // Максимальное здоровье
    const [energy, setEnergy] = useState(100); // Энергия
    const [lvl, setLvl] = useState(0); // Уровень

    const [damageUpgradeCost, setDamageUpgradeCost] = useState(10); // Стоимость улучшения урона
    const [maxEnergyUpgradeCost, setMaxEnergyUpgradeCost] = useState(15); // Стоимость улучшения макс. энергии
    const [energyRecoverySpeedUpgradeCost, setEnergyRecoverySpeedUpgradeCost] = useState(20); // Стоимость улучшения восстановления энергии

    const [questProgress, setQuestProgress] = useState({
        level: 0,
        coinCount: 0,
        targetCoins: 100, // Начальная цель монет
    });
    const [levelQuestProgress, setLevelQuestProgress] = useState({
        currentLevel: 5, // Текущий целевой уровень
        reward: 50, // Начальная награда за уровень
    });

    const [questReward, setQuestReward] = useState(null); // Награда за выполнение задания
    const [rewardAmount, setRewardAmount] = useState(100); // Начальная награда
    const [showRewardMessage, setShowRewardMessage] = useState(false); // Для отображения поздравления

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

            // Обновляем прогресс задания
            setQuestProgress(prevProgress => ({
                ...prevProgress,
                coinCount: prevProgress.coinCount + damage,
            }));
        }
    };

    useEffect(() => {
        const energyTimer = setInterval(() => {
            setEnergy(prevEnergy => Math.min(prevEnergy + 1, maxEnergy)); // Восстанавливаем энергию до maxEnergy
        }, energyRecoverySpeed);

        return () => clearInterval(energyTimer);
    }, [maxEnergy, energyRecoverySpeed]);

    useEffect(() => {
        // Проверка на выполнение задания
        if (lvl >= 5) {
            setQuestReward('Задание выполнено: Уровень 5 достигнут!');
        }

        // Если собрали достаточно монет, обновляем задание
        if (questProgress.coinCount >= questProgress.targetCoins) {
            setQuestReward(`Поздравляем! Вы собрали ${questProgress.targetCoins} монет и получаете ${rewardAmount} монет в качестве награды!`);
            setCount(prevCount => prevCount + rewardAmount); // Добавляем монеты за выполнение задания
            setShowRewardMessage(true); // Показываем сообщение

            // Удваиваем количество монет, которое нужно собрать для следующего задания
            setQuestProgress(prevProgress => ({
                ...prevProgress,
                coinCount: 0, // Обнуляем прогресс по монетам
                targetCoins: prevProgress.targetCoins * 2, // Увеличиваем цель в 2 раза
            }));

            // Удваиваем награду для следующего задания
            setRewardAmount(prevReward => prevReward * 2);

            // Таймер для скрытия сообщения через 2 секунды
            setTimeout(() => {
                setShowRewardMessage(false);
            }, 2000);
        }
    }, [lvl, questProgress, rewardAmount]);

    useEffect(() => {
        // Проверка задания по уровню
        if (lvl >= levelQuestProgress.currentLevel) {
            setQuestReward(`Поздравляем! Вы достигли уровня ${levelQuestProgress.currentLevel} и получаете ${levelQuestProgress.reward} монет!`);
            setCount(prevCount => prevCount + levelQuestProgress.reward); // Добавляем монеты за выполнение задания
            setShowRewardMessage(true); // Показываем сообщение

            // Увеличиваем целевой уровень и награду
            setLevelQuestProgress(prevProgress => ({
                currentLevel: prevProgress.currentLevel + 5, // Следующий целевой уровень (увеличивается на 5)
                reward: prevProgress.reward * 2, // Удваиваем награду
            }));

            // Таймер для скрытия сообщения
            setTimeout(() => {
                setShowRewardMessage(false);
            }, 2000);
        }

        // Проверка задания по монетам
        if (questProgress.coinCount >= questProgress.targetCoins) {
            setQuestReward(`Поздравляем! Вы собрали ${questProgress.targetCoins} монет и получаете ${rewardAmount} монет в качестве награды!`);
            setCount(prevCount => prevCount + rewardAmount); // Добавляем монеты за выполнение задания
            setShowRewardMessage(true); // Показываем сообщение

            // Увеличиваем цель и награду
            setQuestProgress(prevProgress => ({
                ...prevProgress,
                coinCount: 0, // Обнуляем прогресс по монетам
                targetCoins: prevProgress.targetCoins * 2, // Увеличиваем цель в 2 раза
            }));
            setRewardAmount(prevReward => prevReward * 2);

            // Таймер для скрытия сообщения
            setTimeout(() => {
                setShowRewardMessage(false);
            }, 2000);
        }
    }, [lvl, questProgress, levelQuestProgress, rewardAmount]);

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

            {activePanel === "Задание" && (
                <div className="QuestPanel">
                    <h2>Задания</h2>
                    <div>
                        <p>Прогресс монет: {questProgress.coinCount} / {questProgress.targetCoins}</p>
                    </div>
                    <div>
                        <p>Прогресс уровня: {lvl} / {levelQuestProgress.currentLevel}</p>
                    </div>
                </div>
            )}

            {showRewardMessage && (
                <div className="reward-message">
                    <p>Поздравляем! Вы собрали {questProgress.targetCoins} монет и получаете {rewardAmount} монет в качестве награды!</p>
                </div>
            )}

            {showRewardMessage && (
                <div className="reward-message">
                    {questReward}
                </div>
            )}
        </div>
    );
};

export default ClickPanel;
