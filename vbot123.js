'use strict';
const BootBot = require('bootbot');
const vBot = new BootBot({
  accessToken: 'EAAD1qIeDj2sBAEZAbyBtRfTZCif9wnwdTC7PDah40rlq69DuLBpvxDPklbTNqCf3dupWaDyaKPZAF1pKqEqslUuZA6TMrbkzTcXE0PDgb9lhrSLaJzBXAzNYwBcmbdC9h5ETWxr2Tt1PU32oq2z6umhBMmRhREEWw08QGvRMFgZDZD',
  verifyToken: 'fh7887987',
  appSecret: 'adb9e46d32c6b561456022e89f2a632f'
});

vBot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);
});
const userGreetings = [
  'hello',
  'hi',
  `good morning`,
  'good afternoon',
  `good night`,
  ];
vBot.hear(userGreetings, (payload, chat) => {
  chat.conversation((convo) => {
    saluteAndSuggest(convo);
  });
});

function saluteAndSuggest(convo){
  convo.ask(`Hello, this is Vbot123 🤖, how can I help you? (try, I am looking for voices)`, (payload, convo) => {
    askVoiceType(convo);
  });
};

function askVoiceType(convo){
  convo.ask(`🎙️ Great, what type of voice are you thinking of?`, (payload, convo) => {
    convo.set('voiceType', payload.message.text.replace(/[^a-zA-Z ]/g, "").split(" "));
    askGender(convo);
  });
};

function askGender(convo){
  convo.ask(`Cool. Any preference on male or female?`, (payload, convo) => {
    const text = payload.message.text;

    if (text.indexOf('Male') !== -1 || text.indexOf('male') !== -1) {
      convo.set('gender', 'male');
    } else if (text.indexOf('Female') !== -1 || text.indexOf('female') !== -1) {
      convo.set('gender', 'female');
    } else {
      convo.set('gender', 'mixed');
    }
    convo.say('Ok, let me see what I can find for you 👍', { typing: true });
    const searchResults = getSearchResults(convo);
    setTimeout(() => {
      convo.say(`Here are some talented actors I've found:`, { typing: true });
      searchResults.forEach(voiceactor => {
        convo.say(voiceactor, {typing: true});
      });
      setTimeout(() => {
        convertUser(convo);
      }, 3000);
    }, 5000);
  });
};

function convertUser(function) {
  convo.ask(`What do you think?`, (payload, convo) => {
    convo.say(`Great!, Now please post a project to have voice actors audition in http://vbot123.tk`, { typing: true });
  });
  convo.end();
}

function getSearchResults(convo) {
    const voiceResults = {
      female: [
        '😉 https://beta.voice123.com/mindybaer1/?sample=1785577',
        '😃 https://beta.voice123.com/helenmooregillon/?sample=1720736',
        '😏 https://beta.voice123.com/naimamoussi/?sample=1776546'
      ],
      male: [
        '😁 https://beta.voice123.com/javierprusky/?sample=1804050',
        '😎 https://beta.voice123.com/geoffgundy/?sample=1821540',
        '🤩 https://beta.voice123.com/seanchiplock/?sample=1709304'
      ],
      mixed: [
        '😺 https://beta.voice123.com/charlietorovo/?sample=1794579',
        '🙀 https://beta.voice123.com/wendybrown/?sample=1632171',
        '😻 https://beta.voice123.com/alyssavo/?sample=1770998'
      ]
    };
    return voiceResults[convo.get('gender')];

}
function getAttributes(data) {
// https://api.beta.voice123.com/attributes/
}


vBot.start(8081);
