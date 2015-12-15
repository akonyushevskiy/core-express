var app = require('../../server.js'),
	should = require('should'),
	request = require('supertest');

describe('Calculator controller tests: ', () => {
	"use strict";
	it('1 + 1 should return 2', (done) => {
		request(app)
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

});