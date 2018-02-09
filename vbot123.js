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
  convo.ask(`Hello, ${user_first_name} This is Vbot123, how can I help you? (try, I am looking for voices)`, (payload, convo) => {
    askVoiceType(convo);
  });
};

function askVoiceType(convo){
  convo.ask(`Great, ${user_first_name} what type of voice are you thinking of?`, (payload, convo) => {
    convo.set('voiceType', payload.message.text.replace(/[^a-zA-Z ]/g, "").split(" "));
    askGender(convo);
  });
};

function askGender(convo){
  convo.ask(`Cool. Any preference on Young Adult Female or Male?`, (payload, convo) => {
    const text = payload.message.text;

    if (text.indexOf('Male') !== -1 || text.indexOf('male') !== -1) {
      convo.set('gender', 'male');
    } else if (text.indexOf('Female') !== -1 || text.indexOf('female') !== -1) {
      convo.set('gender', 'female');
    }
    convo.say('Ok, let me see what I can find for you 👍', { typing: true });
  });
};


vBot.start(8081);
