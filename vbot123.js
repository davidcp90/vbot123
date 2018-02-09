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
    const emojis = [😁, 😎, 🤩, 😺, 🙀, 😻]
    setTimeout(() => {
      convo.say(`Here are some talented actors I've found:`, { typing: true });
      searchResults.forEach(voiceactor => {
        convo.say(emojis[generateRandomInteger(0, 5)]);
        convo.say(voiceactor, {typing: true});
      });
      setTimeout(() => {
        convertUser(convo);
      }, 30000);
    }, 5000);
  });
};

function convertUser(convo) {
  convo.ask(`What do you think?`, (payload, convo) => {
    convo.say(`Great!, Now please post a project to have voice actors audition in http://vbot123.tk`, { typing: true });
    convo.end();
  });
}
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random()*(max+1 - min))
}
function getSearchResults(convo) {
    const voiceResults = {
      female: [
        'https://voice123.com/mp3/demos/mindybaer1%20-%20TV%20Narration.mp3',
        'https://voice123.com/mp3/demos/helenmooregillon%20-%20TransAtlantic.mp3',
        'https://voice123.com/mp3/demos/naimamoussi%20-%20MEDLEY%20MANY%20PROJECTS.mp3'
      ],
      male: [
        'https://voice123.com/mp3/demos/javierprusky%20-%20Animation%20Demo.mp3',
        'https://voice123.com/mp3/demos/geoffgundy%20-%20Geoff%20Gundy%20Narration%20Demo.mp3',
        'https://voice123.com/mp3/demos/seanchiplock%20-%20Sean%20Chiplock%20-%20CHARACTERANIMATION1.mp3'
      ],
      mixed: [
        'https://voice123.com/mp3/demos/charlietorovo%20-%20IT%20Company%20Promo.mp3',
        'https://voice123.com/mp3/demos/wendybrown%20-%20Car%20Spots%20-%20NEW.mp3',
        'https://voice123.com/mp3/demos/alyssavo%20-%20Animation%20Demo.mp3'
      ]
    };
    return voiceResults[convo.get('gender')];

}
function getAttributes(data) {
// https://api.beta.voice123.com/attributes/
}


vBot.start(8081);
