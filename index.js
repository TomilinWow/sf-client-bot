const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '5752394214:AAG-Kkj3SVQ24n-2oRcokQCorYOFz3a-wag';
const webAppUrl = 'https://harmonious-druid-0b7271.netlify.app';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/code', description: 'Код доступа'},
])

let current_code = '123'
let premessage;

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log(msg)
    if(text === '/start') {
        await bot.sendMessage(chatId, 'Добро пожаловать в админку Street Family!!!')
        await bot.sendMessage(chatId, 'Напишите /code, чтобы ввести свой код доступа')
        premessage = '/start'
    }

    if(premessage === '/code') {
        // запрос в бд
        // в будущем
        if (current_code === text) {
            premessage = ''
            await bot.sendMessage(chatId, 'Вы вошли!', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Открыть приложение", web_app: {url: webAppUrl}}]
                    ]
                }
            })
        } else {
            await bot.sendMessage(chatId, 'Неправильный код, попробуйте снова!\n/code')
            premessage = ''
        }
    }

    if(text === '/code') {
        await bot.sendMessage(chatId, 'Ваш код доступа:')
        premessage = '/code'

    }
});


const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))
