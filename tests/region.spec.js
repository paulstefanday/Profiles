var app = require('../server');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var co = require('co');
var M = require('../models'),
	config = require('../config/config'),
	thinky = require('thinky')(),
	r = thinky.r;


describe('V1: Region', function () {

	var data = require('./helpers/data'),
		region = data.test_region,
		route;

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

			route = data.v + '/campaign/' + data.global_campaign_id + '/region/';

			done();
		});
	})

	after(require('./helpers/after'));




	describe('Create', function () {
		it('works when a user is logged in', function (done) {
			request.post(route)
				.set('Authorization', data.root_admin.token)
				.send(region)
				.expect(201)
				.end(function(err, res){
					region.id = res.body.id;
					done(err);
				})
		});

		it('fails when a user is not logged in', function (done) {
			request.post(route)
				.send(region)
				.expect(403, done)
		});
	});

	describe('Update', function () {

		var update = {title: 'North shore!!!!'};

		it('works when user is a campaigner for that Region', function (done) {
			request.put(route + region.id)
				.set('Authorization', data.root_admin.token)
				.send(update)
				.expect(/replaced":1/)
				.expect(201, done);
		});

		it('fails when user is not a campaigner for that Region', function (done) {
			request.put(route + region.id)
				.set('Authorization', data.non_admin.token)
				.send(update)
				.expect(/message/)
				.expect(403, done);
		});

	});

	describe('addUser', function () {

		var test_record = { email: data.admin.email };

		it('works only when user is a campaigner for that Region', function (done) {
			request.post(route + region.id + '/user')
				.set('Authorization', data.root_admin.token)
				.send(test_record)
				.expect(/inserted":1/)
				.expect(201, done);
		});

		it('fails when user is not a campaigner for that Region', function (done) {
			request.post(route + region.id + '/user')
				.set('Authorization', data.non_admin.token)
				.send(test_record)
				.expect(/message/)
				.expect(403, done);
		});

		it('add user who hasn\'t been created yet', function (done) {
			request.post(route + region.id + '/user')
				.set('Authorization', data.root_admin.token)
				.send({email: 'addnewusertest@test.com', first_name: 'testnewrecorduser'})
				.expect(/inserted":1/)
				.expect(201, done);
		});

	});

	describe('removeUser', function () {

		var test_record = { email: data.admin.email, first_name: 'testrecorduser' };

		it('works when user is a campaigner for that Region', function (done) {
			request.delete(route + region.id + '/user')
				.set('Authorization', data.root_admin.token)
				.send(test_record)
				.expect(/deleted":1/)
				.expect(201, done);
		});

		it('fails when user is not a campaigner for that Region', function (done) {
			request.delete(route + region.id + '/user')
				.set('Authorization', data.non_admin.token)
				.send(test_record)
				.expect(/message/)
				.expect(403, done);
		});

		it('fails to remove user who hasn\'t been created yet', function (done) {
			request.delete(route + region.id + '/user')
				.set('Authorization', data.root_admin.token)
				.send({ email: 'fakeidthatdoesnotwork@test.com' })
				.expect(/User not found/)
				.expect(404, done);
		});

	});

	describe('addOrganiser', function () {

		var test_record = { email: data.admin.email, first_name: 'testrecorduser' };
		var uncreated_user = {email: 'addnewusertest@test.com', first_name: 'uncreateduser'};

		it('works when user is a organiser for that Region', function (done) {
			request.post(route + region.id + '/organiser')
				.set('Authorization', data.root_admin.token)
				.send(test_record)
				.expect(/replaced":1/)
				.expect(201, done);
		});

		it('fails when user is not a organiser for that Region', function (done) {
			request.post(route + region.id + '/organiser')
				.set('Authorization', data.non_admin.token)
				.send(test_record)
				.expect(/message/)
				.expect(403, done);
		});

		it('add user who hasn\'t been created yet', function (done) {
			request.post(route + region.id + '/organiser')
				.set('Authorization', data.root_admin.token)
				.send(uncreated_user)
				.expect(/replaced":1/)
				.expect(201, done)
				// .end(function(err, res){
				// 	res.body.
				// });
		});

		// it('add user using newly granted access', function (done) {
		// 	request.post(route + region.id + '/organiser')
		// 		.set('Authorization', data.admin.token)
		// 		.send({email: 'someweirdemail@test.com'})
		// 		.expect(/replaced":1/)
		// 		.expect(201, done);
		// });


	});

	describe('removeOrganiser', function () {

		var test_record = { email: data.admin.email };

		it('works when user is a campaigner for that Region', function (done) {
			request.delete(route + region.id + '/organiser')
				.set('Authorization', data.root_admin.token)
				.send(test_record)
				.expect(/replaced":1/)
				.expect(201, done);
		});

		it('fails when user is not a campaigner for that Region', function (done) {
			request.delete(route + region.id + '/organiser')
				.set('Authorization', data.non_admin.token)
				.send(test_record)
				.expect(/message/)
				.expect(403, done);
		});

		it('fails to remove user who hasn\'t been created yet', function (done) {
			request.delete(route + region.id + '/organiser')
				.set('Authorization', data.root_admin.token)
				.send({ email: 'fakeidthatdoesnotwork@test.com', first_name: 'fakeid' })
				.expect(/User not found/)
				.expect(404, done);
		});

	});

});