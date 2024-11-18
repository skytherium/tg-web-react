const TelegramBot = require('node-telegram-bot-api');


const token = '7872207615:AAE3ci1ijNcl9JqXGVmpTt_R3qybI2aY8UM';
const webAppUrl='https://ya.ru';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        bot.sendMessage(chatId, 'Кнопка', {
            reply_markup: {
                keyboard: [
                    [{ text: 'Кнопка2' }]
                ]
            }
        });


    await bot.sendMessage(chatId,'Нажми на кнопку если сосал',{
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Кнопка2' ,web_app:{url:webAppUrl}}]
            ]
        }
    });

    }
});




