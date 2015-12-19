var should = require('should'),
	request = require('supertest');

describe('Calculator controller tests: ', () => {
	"use strict";
	var server;

	beforeEach(function (done) {
		server = require('../../server');
		done();
	});

	afterEach(function (done) {
		server.close(() => {done();});
	});

	it('1 + 1 should return 2', (done) => {
		request(server)
			.get('/api/calculate/sum/?a=1&b=1')
			.set('Accept', 'application/json')
			.expect(200)
			.end((err, res) => {
				//console.log(res.body);
				res.body.should.be.an.Object();
				res.body.should.have.property('sum', 2);
				res.body.should.not.have.property('error');
				done();
			});
	});

	it('1 + a should return error', (done) => {
		request(server)
			.get('/api/calculate/sum/?a=a&b=1')
			.expect(500)
			.end((err, res) => {
				res.body.should.be.an.Object();
				res.body.should.have.property('error', 'One of params is not a number');
				done();
			});
	});

});