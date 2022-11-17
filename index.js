const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '5731874868:AAHVQbSvUtn-GUJ4OYAfQcr-WqnLEtxjsdQ';
const webAppUrl = 'https://effulgent-sunshine-0e8393.netlify.app';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
])


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log(msg)
    if(text === '/start') {
        await bot.sendMessage(chatId, 'Добро пожаловать в Street Family!!!', {
            reply_markup: {
                inline_keyboard: [
                    [{text: "Открыть приложение", web_app: {url: webAppUrl}}]
                ]
            }
        })

    }

});


const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))
