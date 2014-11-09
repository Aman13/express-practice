
'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	accepts = require('express-accepts'),
	_ = require('lodash'),
	table = require('./table');

var app = express();
app.use(accepts('application/json'));
app.use(bodyParser.json());
var iceCreams = table();

app.get('/polls', function pollOptions(request, response) {
	//return poll options
	response.status(200).send(iceCreams);
});

app.post('/vote/:flavor', function vote(request, response) {
	var iceCream = _.find(iceCreams, {flavor: request.params.flavor});
	if (iceCream) {
		if (_.has(request.body, 'amount')) {
			if (request.body.amount <= 10) {
				console.log('we got ' + request.body.amount + ' votes for ' + request.params.flavor);
				iceCream.vote += request.body.amount;
			} else {
				response.status(400).send({error: 'TOO_MANY_VOTES'});
			}
		} else {
			console.log('Need to give an amount');
			response.status(400).send({error: 'GIVE_AMOUNT'});
		}
		response.status(200).send(request.params.flavor);
	} else {
		response.status(400).send({ error: 'INVALID_FLAVOR' });
	}
});

module.exports = app;
