var app = require('../server');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var co = require('co');
var M = require('../models'),
	config = require('../config/config'),
	thinky = require('thinky')(),
	r = thinky.r;

describe('V1: Auth', function() {

	var fake;

	before(function(done) {
		co(function *() {
			fake = yield require('./helpers/before')(request);
			done();
		})
	})

	after(require('./helpers/after'));


	describe('User Authentication', function() {

		describe('/signup', function() {

			// test with no password
			it('fails to create a user without a password', function(done){
				request
					.post(fake.data.v + '/signup/')
					.send({email: fake.user().email})
					.expect(/message/)
					.expect(/You must fill out all fields to signup/)
					.expect(403, done)
			})

			it('creates a new user', function(done){
				request
					.post(fake.data.v + '/signup/')
					.send(fake.user())
					.expect(/token/)
					.expect(200, done)
			})

			it('fails to create already existing user', function(done){
				request
					.post(fake.data.v + '/signup/')
					.send(fake.users[0])
					.expect(/message/)
					.expect(/You have already signed up./)
					.expect(400, done)
			})

		})

		describe('/login', function() {

			it('logs in with incorrect details', function(done){
				request
					.post(fake.data.v + '/login')
					.send(fake.user())
					.expect(/message/)
					.expect(/Please sign up./)
					.expect(404, done)
			})

			it('logs in with correct details', function(done){

				request
					.post(fake.data.v + '/login')
					.send({email: fake.users[0].email, password: fake.users[0].password})
					.expect(/token/)
					.expect(200)
					.end(function(err, res) {
						done(err);
					})
			})

			// it('can\'t access protected information without token', function(done){
			// 	request
			// 		.get(fake.data.v + '/campaign/' + fake.data.global_campaign_id + '/profiles')
			// 		.expect(403, done);
			// })

			// it('can access protected information with token', function(done){
			// 	request
			// 		.get(fake.data.v + '/campaign/' + fake.data.global_campaign_id + '/profiles')
			// 		.set('Authorization', token)
			// 		.expect(200, done);
			// })

		})

		describe('/reset', function() {

			it('resets an existing users password', function(done){
				request.post(fake.data.v + '/reset')
					.send({email: fake.users[0].email })
					.expect(200, done)
			})

			it('fails to login with old password', function(done){

				var wrongpass = fake.users[0];
				wrongpass.password = 'asdsadad';

				request
					.post(fake.data.v + '/login')
					.send(wrongpass)
					.expect(/message/)
					.expect(/Incorrect details./)
					.expect(401, done)
			})

			it('fails to reset non existant user', function(done) {
				request.post(fake.data.v + '/reset')
					.send({email: fake.user().email })
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