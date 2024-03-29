'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express().use(bodyParser.json());

app.listen(process.env.PORT || 1337, () => console.log('it works G'));


app.post('/webhook', (req, res) => {
	let body = req.body;

	if (body.object === 'page') {
		body.entry.forEach(function (entry) {
			let webhook_event = entry.messaging[0];
			console.log(webhook_event);
		});

		res.status(200).send('EVENT_RECEIVED');

	} else {
		res.sendStatus(404);
	}

});



app.get('/webhook', (req, res) => {
	let VERIFY_TOKEN = "TESTING123"


	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	console.log(token);
	let challenge = req.query['hub.challenge'];

	if (mode && token) {
		// Testing curl -X GET "localhost:1337/webhook?hub.verify_token=TESTING123&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"	
		if (mode === 'subscribe' && token === VERIFY_TOKEN) {

			console.log('WEBHOOK_VERIFIED');
			res.status(200).send(challenge);

		} else {
			res.sendStatus(403);
		}
	}
});