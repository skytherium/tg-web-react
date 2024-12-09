const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql2/promise');

// Конфигурация бота
const token = '7872207615:AAE3ci1ijNcl9JqXGVmpTt_R3qybI2aY8UM';
const webAppUrl = 'https://zxcome.netlify.app';
const bot = new TelegramBot(token, { polling: true });

// Конфигурация базы данных
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234', // Укажите ваш пароль
    database: 'clicker_app',
};

// Функция для сохранения пользователя в базу данных
const saveUserToDatabase = async (telegramId, name) => {
    try {
        console.log(`Пытаемся сохранить пользователя с telegram_id: ${telegramId}`);
        const connection = await mysql.createConnection(dbConfig);
        console.log('Подключение к базе данных установлено');

        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE telegram_id = ?',
            [telegramId]
        );

        if (rows.length === 0) {
            await connection.execute(
                'INSERT INTO users (telegram_id, name) VALUES (?, ?)',
                [telegramId, name]
            );
            console.log(`Пользователь с telegram_id ${telegramId} добавлен в базу данных`);
        } else {
            console.log(`Пользователь с telegram_id ${telegramId} уже существует в базе данных`);
        }

        await connection.end();
        console.log('Соединение с базой данных закрыто');
    } catch (error) {
        console.error('Ошибка при работе с базой данных:', error.message);
    }
};

// Обработка сообщений
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        const telegramId = msg.from.id;
        const name = msg.from.username || msg.from.first_name || 'Unknown';
        console.log(`Получено сообщение от пользователя: ${name} (${telegramId})`);

        // Сохраняем пользователя в базу данных
        await saveUserToDatabase(telegramId, name);

        // Отправка сообщения с клавиатурой
        await bot.sendMessage(chatId, 'Добро пожаловать! Выберите опцию:', {
            reply_markup: {
                keyboard: [
                    [{ text: 'Кнопка2' }]
                ],
                resize_keyboard: true,
            },
        });

        // Отправка сообщения с кнопкой для веб-приложения
        await bot.sendMessage(chatId, 'Нажмите на кнопку для открытия веб-приложения:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Открыть веб-приложение',
                            web_app: { url: webAppUrl },
                        },
                    ],
                ],
            },
        });
    }
});
