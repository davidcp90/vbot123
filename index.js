'use strict';
const BootBot = require('bootbot');
import { VBOTCONFIG } from 'config/VBotConfig';
const vBot = new BootBot(VBOTCONFIG);

vBot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();
