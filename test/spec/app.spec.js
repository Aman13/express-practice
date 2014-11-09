
'use strict';

var app = require('app'),
	request = require('supertest');

describe('POST /vote/:flavor', function() {
	it('should work', function(done) {
		request(app)
			.post('/vote/chocolate')
			.set('Accept', 'application/json')
			.send({ amount: 5 })
			.expect(function(res) {
				expect(res).to.have.status(200);
			})
			.end(done);
	});
	it('vote amount too high', function(done) {
		request(app)
			.post('/vote/mint')
			.set('Accept', 'application/json')
			.send({ amount: 11 })
			.expect(function(res) {
				expect(res).to.have.status(400);
			})
			.end(done);
	});
	it('invalid flavor', function(done) {
		request(app)
			.post('/vote/pooh')
			.set('Accept', 'application/json')
			.send({ amount: 5 })
			.expect(function(res) {
				expect(res).to.have.status(400);
			})
			.end(done);
	});
	it('should error when no amount is provided', function(done) {
		request(app)
			.post('/vote/chocolate')
			.set('Accept', 'application/json')
			.send({ potato: 5 })
			.expect(function(res) {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('error', 'GIVE_AMOUNT');
			})
			.end(done);
	});

});
describe('GET /polls', function() {
	it('should return the results', function(done) {
		request(app)
			.get('/polls')
			.set('Accept', 'application/json')
			.expect(function(res) {
				expect(res).to.have.status(200);
				expect(res.body).to.have.length(4);
				expect(res.body[0]).to.have.property('vote');
			})
			.end(done);
	});
});
