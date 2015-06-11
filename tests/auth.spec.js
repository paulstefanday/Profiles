var app = require('../server');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var co = require('co');
var M = require('../models'),
	config = require('../config/config'),
	thinky = require('thinky')(),
	r = thinky.r;

describe('V1: Auth', function() {

	var data = require('./helpers/data');

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

			done();
		});
	})

	after(require('./helpers/after'));


	describe('User Authentication', function() {

		var token;
		var wrong_user = { email: 'asdasdasfdsfdsf@sdfsdfsdfsdfsdfsdf.com', password: '123123sb4', first_name: 'wronguser'};
		var a_user = { email: 'anothertest@testperson.com', password: '123asdasd4', first_name: 'auser'};

		after(function() {
			r.db('test').table('users').filter({ email: a_user.email }).delete().run();
		})

		describe('/signup', function() {

			// test with no password
			it('fails to create a user without a password', function(done){
				request
					.post(data.v + '/signup/')
					.send({email: a_user.email})
					.expect(/message/)
					.expect(/You must fill out all fields to signup/)
					.expect(403, done)
			})

			it('creates a new user', function(done){
				request
					.post(data.v + '/signup/')
					.send(a_user)
					.expect(/token/)
					.expect(200, done)
			})

			it('fails to create already existing user', function(done){
				request
					.post(data.v + '/signup/')
					.send(a_user)
					.expect(/message/)
					.expect(/You have already signed up./)
					.expect(400, done)
			})

		})

		describe('/login', function() {

			it('logs in with incorrect details', function(done){
				request
					.post(data.v + '/login')
					.send(wrong_user)
					.expect(/message/)
					.expect(/Please sign up./)
					.expect(404, done)
			})

			it('logs in with correct details', function(done){
				request
					.post(data.v + '/login')
					.send(a_user)
					.expect(/token/)
					.expect(200)
					.end(function(err, res) {
						token = res.body.token;
						done(err);
					})
			})

			it('can\'t access protected information without token', function(done){
				request
					.get(data.v + '/campaign/' + data.global_campaign_id + '/profiles')
					.expect(403, done);
			})

			it('can access protected information with token', function(done){
				request
					.get(data.v + '/campaign/' + data.global_campaign_id + '/profiles')
					.set('Authorization', token)
					.expect(200, done);
			})

		})

		describe('/reset', function() {

			it('resets an existing users password', function(done){
				request.post(data.v + '/reset')
					.send({email: a_user.email })
					.expect(200, done)
			})

			it('fails to login with old password', function(done){
				request
					.post(data.v + '/login')
					.send(a_user)
					.expect(/message/)
					.expect(/Incorrect details./)
					.expect(401, done)
			})

			it('fails to reset non existant user', function(done) {
				request.post(data.v + '/reset')
					.send({email: wrong_user.email })
					.expect(/This account does not exist. Please sign up./)
					.expect(404, done)
			})

		});

		describe('Add admin', function () {

			it('fails when user does not have root access')
			it('works if user has root admin access')
			it('has root string in permissions field when access is granted')

		});

		describe('Delete admin', function () {

			it('fails when user does not have root access')
			it('works if user has root admin access')
			it('doesn\'t have root string in permissions field when access is removed')
			
		});

	})

});