var app = require('../server');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var co = require('co');
var M = require('../models'),
	config = require('../config/config'),
	thinky = require('thinky')(),
	r = thinky.r;

describe('V1: Outcome', function () {

	var data = require('./helpers/data'),
		test_outcome_id,
		route,
		outcome1 = {
			title: 'A Tweet',
			description: 'Send a tweet and include an @campaigname',
			value: 100
		};
		

	before(function(done) {
		co(function *(){

			var res1 = yield request.post(data.v + '/signup/').send(data.non_admin).end();
			data.non_admin.token = res1.body.token;

			var res2 = yield request.post(data.v + '/signup/').send(data.admin).end();
			data.admin.token = res2.body.token;

			var res3 = yield request.post(data.v + '/signup/').send(data.root_admin).end();
			data.root_admin.token = res3.body.token;

			var res4 = yield request.post(data.v + '/campaign').set('Authorization', data.root_admin.token).send(data.test_campaign).end();
			data.global_campaign_id = res4.body.id;

			route = data.v + '/campaign/' + data.global_campaign_id + '/outcome';	

			done();
		});




	})

	after(require('./helpers/after'));




	describe('Get', function () {
		it('is an array', function(done){
			request
				.get(route)
				.expect(200, function(err, res){
					expect(res.body).to.be.an('Array');
					done(err);
				})
		})
	});

	describe('Create', function () {

		it('won\'t work if you are logged out', function(done){
			request
				.post(route)
				.send(outcome1)
				.expect(403)
				.expect(/You are not logged in./)
				.end(function(err, res){
					done(err);
				})
		})

		it('won\'t work if you are a normal user', function(done){
			request
				.post(route)
				.set('Authorization', data.non_admin.token)
				.send(outcome1)
				.expect(403)
				.expect(/You are not a campaign admin./)
				.end(function(err, res){
					done(err);
				})
		})

		it('work if user is an admin', function(done) {
			request
				.post(route)
				.set('Authorization', data.root_admin.token)
				.send(outcome1)
				.expect(201)
				.expect(/{"title":"A Tweet","description":"Send a tweet and include an @campaigname","value":100/)
				.end(function(err, res){
					outcome1.id = res.body.id;
					done(err);
				})
		});

	});

	describe('Update', function () {
		var change1 = {
			title: 'An email to your MP!'
		};

		it('won\'t work if you are logged out', function(done){
			request
				.put(route + '/' + outcome1.id)
				.send(change1)
				.expect(403)
				.expect(/You are not logged in./)
				.end(function(err, res){
					done(err);
				})
		})

		it('won\'t work if you are a normal user', function(done){
			request
				.put(route + '/' + outcome1.id)
				.set('Authorization', data.non_admin.token)
				.send(change1)
				.expect(403)
				.expect(/You are not a campaign admin./)
				.end(function(err, res){
					done(err);
				})
		})

		it('work if user is an admin', function(done) {
			request
				.put(route + '/' + outcome1.id)
				.set('Authorization', data.root_admin.token)
				.send(change1)
				.expect(201)
				.expect(/deleted":0,"errors":0,"inserted":0,"replaced":1,"skipped":0,"unchanged":0/)
				.end(function(err, res){
					done(err);
				})
		});
	});

	describe('Delete', function () {
		it('won\'t work if you are logged out', function(done){
			request
				.delete(route + '/' + outcome1.id)
				.expect(403)
				.expect(/You are not logged in./)
				.end(function(err, res){
					done(err);
				})
		})

		it('won\'t work if you are a normal user', function(done){
			request
				.delete(route + '/' + outcome1.id)
				.set('Authorization', data.non_admin.token)
				.expect(403)
				.expect(/You are not a campaign admin./)
				.end(function(err, res){
					done(err);
				})
		})

		it('work if user is an admin', function(done) {
			request
				.delete(route + '/' + outcome1.id)
				.set('Authorization', data.root_admin.token)
				.expect(200)
				.expect(/deleted":1,"errors":0,"inserted":0,"replaced":0,"skipped":0,"unchanged":0/)
				.end(function(err, res){
					done(err);
				})
		});

	});

});