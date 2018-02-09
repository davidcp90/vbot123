'use strict';
const BootBot = require('bootbot');
const vBot = new BootBot({
  accessToken: 'EAAD1qIeDj2sBAEZAbyBtRfTZCif9wnwdTC7PDah40rlq69DuLBpvxDPklbTNqCf3dupWaDyaKPZAF1pKqEqslUuZA6TMrbkzTcXE0PDgb9lhrSLaJzBXAzNYwBcmbdC9h5ETWxr2Tt1PU32oq2z6umhBMmRhREEWw08QGvRMFgZDZD',
  verifyToken: 'fh7887987',
  appSecret: 'adb9e46d32c6b561456022e89f2a632f'
});

bot.hear('ask me something', (payload, chat) => {
	chat.conversation((convo) => {
		askName(convo);
	});

	const askName = (convo) => {
		convo.ask(`What's your name?`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('name', text);
			convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
		});
	};

	const askFavoriteFood = (convo) => {
		convo.ask(`What's your favorite food?`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('food', text);
			convo.say(`Got it, your favorite food is ${text}`).then(() => sendSummary(convo));
		});
	};

	const sendSummary = (convo) => {
		convo.say(`Ok, here's what you told me about you:
	      - Name: ${convo.get('name')}
	      - Favorite Food: ${convo.get('food')}`);
      convo.end();
	};
});



vBot.start(8081);
