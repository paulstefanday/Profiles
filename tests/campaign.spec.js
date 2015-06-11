var app = require('../server');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var co = require('co');
var M = require('../models'),
	config = require('../config/config'),
	thinky = require('thinky')(),
	r = thinky.r;

describe('V1: Campaign', function() {

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



	describe('Create', function(){

		it('can\'t create a new campaign from any user except server admin', function(done) {
			request
				.post(data.v + '/campaign')
				.set('Authorization', data.non_admin.token)
				.send(data.test_campaign)
				.expect(/message/)
				.expect(/Access Denied - You are not a root admin./)
				.expect(403, done);
		})

		it('can create a new campaign from a root admin', function(done) {
			request
				.post(data.v + '/campaign')
				.set('Authorization', data.root_admin.token)
				.send(data.test_campaign)
				.expect(/title/)
				.expect(/description/)
				.expect(201).end(function(err, res) {
					data.campaign_id = res.body.id;
					done(err);
				});
		})
	})

	describe('Find a record', function(){
		it('does exists', function(done) {
			request.get(data.v + '/campaign/'+data.campaign_id).expect(200, done)
		})

		it('doesn\'t exists', function(done) {
			request.get(data.v + '/campaign/ad-b747f3c0c0-4c33-bf73-48ee1baa68c5').expect(500, done)
		})

	})

	describe('Add/Remove Access', function() {

		var admin2 = { email: 'admin22@testperson.com', password: '123asdasd4', first_name: 'admin2'};

		it('user can\'t use admin route', function(done){
			request.put(data.v + '/campaign/' + data.campaign_id + '/admin')
				.set('Authorization', data.non_admin.token)
				.send(data.admin)
				.expect(/Access Denied - You are not a campaign admin./)
				.expect(403, done)
		})

		it('admin can add other existing users to admins', function(done){
			request.put(data.v + '/campaign/' + data.campaign_id + '/admin')
				.set('Authorization', data.root_admin.token)
				.send(data.admin)
				.expect(/replaced":1/)
				.expect(/errors":0/)
				.expect(201, done)
		})

		it('admin can add uncreated user as admin with new account', function(done) {
			request.put(data.v + '/campaign/' + data.campaign_id + '/admin')
				.set('Authorization', data.admin.token)
				.send(admin2)
				.expect(/replaced":1/)
				.expect(/errors":0/)
				.expect(201, done)
		})

		it('admin can remove an admin')
		it('a user can\'t remove an admin')
		it('fails when user id doesn\'t exist')

	})

	describe('Update', function() {
		it('admin can edit campaign')
		it('non admin can\'t edit campaign')
		it('admin can\'t update other fields it\'s not allowed to')
	})

});