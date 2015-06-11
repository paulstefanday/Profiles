var app = require('../server');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var co = require('co');
var H = require('../config/helpers'),
	M = require('../models'),
	_ = require('lodash'),
	config = require('../config/config'),
	thinky = require('thinky')(),
	r = thinky.r,
	beforeFn = require('./helpers/before');

describe('V1: Action', function () {

	var data = require('./helpers/data'),
		route;
		
	before(function(done) {
		co(function *(){	
			data = yield beforeFn(request);
			route = data.v + '/campaign/' + data.global_campaign_id + '/action';	
			done();
		}).catch(function(err){ console.log(err); });
	})
	after(require('./helpers/after'));




	// describe('Get', function () {
	// 	it('is an array', function(done){
	// 		request
	// 			.get(route)
	// 			.expect(200, function(err, res){
	// 				expect(res.body).to.be.an('Array');
	// 				done(err);
	// 			})
	// 	})
	// });


	// non_admin creates an action and has access to other routes non_admin2 does not.
	describe('Create', function () {

		var action = data.test_action;
		delete action.id;

		it('fails if you are logged out', function(done){
			request
				.post(route)
				.send(action)
				.expect(403)
				.expect(/You are not logged in./)
				.end(function(err, res){
					done(err);
				})
		})

		it('works if you are a normal user', function(done){

			request
				.post(route)
				.set('Authorization', data.non_admin.token)
				.send(action)
				.expect(201)
				.end(function(err, res){
					expect(res.body.title).to.equal(action.title);
					expect(res.body.description).to.equal(action.description);
					expect(res.body.notes).to.be.an('Array');
					done(err);
				})
		});

		it('doesn\'t have region field if no id is provided');

		it('does have region field if provided');

	});

	describe('Update', function () {
		var change1 = {
				title: 'Let\'s fix all the problems!'
			},
			action = data.test_action;
		delete action.id;

		it('won\'t work if you are logged out', function(done){
			request
				.put(route + '/' + action.id)
				.send(change1)
				.expect(403)
				.expect(/You are not logged in./)
				.end(function(err, res){
					done(err);
				})
		})

		it('work if user created the action', function(done) {
			request
				.put(route + '/' + action.id)
				.set('Authorization', data.non_admin.token)
				.send(change1)
				.expect(201)
				.expect(/deleted":0,"errors":0,"inserted":0,"replaced":1,"skipped":0,"unchanged":0/)
				.end(function(err, res){
					done(err);
				})
		});
	});

	describe('Invite a user/users', function () {
		var action = data.test_action;
		
		it('add a single id', function(done){
			var test = { id: data.non_admin.id };

			request
				.put(route + '/' + action.id + '/users' )
				.set('Authorization', data.non_admin.token)
				.send(test)
				.expect(201)
				.end(function(err, res) {
					expect(res.body.inserted).to.equal(1)
					expect(res.body.generated_keys).to.have.length(1)
					done(err);
				})
		})
		
		it('add mutiple id\'s', function(done){
			var test = { id: [ data.non_admin.id, data.root_admin.id, data.admin.id ] };

			request
				.put(route + '/' + action.id + '/users' )
				.set('Authorization', data.non_admin.token)
				.send(test)
				.expect(201)
				.end(function(err, res) {
					expect(res.body.inserted).to.equal(test.id.length)
					expect(res.body.generated_keys).to.have.length(test.id.length)
					done(err);
				})
		})
	
	});



	describe('Outcomes', function() {
		var action = data.test_action;
		
		it('fails to add an outcome if they are not an action owner', function (done) {
			request
				.put(route + '/' + action.id + '/outcome')
				.set('Authorization', data.non_admin2.token)
				.send({id: data.test_outcomes[0].id})
				.expect(403)
				.end(function(err, res){
					console.log(res.body);
					done(err);
				})
		});

		it('adds an outcome if they are action owner', function (done) {
			request
				.put(route + '/' + action.id + '/outcome')
				.set('Authorization', data.non_admin.token)
				.send({id: data.test_outcomes[0].id})
				.expect(201)
				.end(function(err, res){
					console.log(res.body);
					done(err);
				})
		});

		it('fails to add an outcome if they are not an action owner', function (done) {
			request
				.delete(route + '/' + action.id + '/outcome')
				.set('Authorization', data.non_admin2.token)
				.send({id: data.test_outcomes[0].id})
				.expect(403)
				.end(function(err, res){
					console.log(res.body);
					done(err);
				})
		});

		it('adds an outcome if they are action owner', function (done) {
			request
				.delete(route + '/' + action.id + '/outcome')
				.set('Authorization', data.non_admin.token)
				.send({id: data.test_outcomes[0].id})
				.expect(201)
				.end(function(err, res){
					console.log(res.body);
					done(err);
				})
		});

	})

	describe('Notes', function() {
		var action = data.test_action;

		it('fails to add a note for non action user', function(done) {
			request
				.put(route + '/' + action.id + '/note')
				.set('Authorization', data.non_admin2.token)
				.send(data.test_notes[0])
				.expect(403)
				.end(function(err, res) {
					// console.log(res.body)
					done(err);
				})
		})

		it('add\'s a note when user is an action user', function(done){
			request
				.put(route + '/' + action.id + '/note')
				.set('Authorization', data.non_admin.token)
				.send(data.test_notes[0])
				.expect(201)
				.end(function(err, res) {
					// console.log(res.body)
					done(err);
				})
		})

		it('fails to remove a note for user who did not create note', function(done) {
			request
				.delete(route + '/' + action.id + '/note')
				.set('Authorization', data.non_admin2.token)
				.send(data.test_notes[0])
				.expect(403)
				.end(function(err, res) {
					// console.log(res.body)
					done(err);
				})
		})


		it('fails to remove a note becasue it doesn\'t exist', function(done){
			request
				.delete(route + '/' + action.id + '/note')
				.set('Authorization', data.non_admin.token)
				.send({text: 'asdasdasdsadasd'})
				.expect(403)
				.end(function(err, res) {
					// console.log(res.body)
					done(err);
				})
		})

		it('removes a note when user is the note owner', function(done){
			request
				.delete(route + '/' + action.id + '/note')
				.set('Authorization', data.non_admin.token)
				.send(data.test_notes[0])
				.expect(201)
				.end(function(err, res) {
					// console.log(res.body)
					done(err);
				})
		})


	})

	describe('Results', function() {
		var action = data.test_action;

		it('fails if results is no an array', function(done){
			request
				.put(route + '/' + action.id + '/results')
				.set('Authorization', data.non_admin.token)
				.send({results: 'failing test'})
				.expect(403, done)
		});

		it('works if results is wrapped in an array', function(done){
			var test = { results: [
				{ percentage: 10, outcomeId: data.test_outcomes[0].id }
			]};

			request
				.put(route + '/' + action.id + '/results')
				.set('Authorization', data.non_admin.token)
				.send(test)
				.expect(201)
				.end(function(err, res){
					expect(res.body.changes[0].new_val.results).to.have.length(1)
					done(err);
				})
		})


	})

	describe('Delete user', function(){
		var action = data.test_action;

		it('fails when non action owner tries to remove', function(done){
			var test = { id: data.admin.id };

			request
				.delete(route + '/' + action.id + '/users' )
				.set('Authorization', data.non_admin2.token)
				.send(test)
				.expect(403)
				.end(function(err, res) {
					done(err);
				})
		})

		it('removes a single id', function(done){
			var test = { id: data.admin.id };

			request
				.delete(route + '/' + action.id + '/users' )
				.set('Authorization', data.non_admin.token)
				.send(test)
				.expect(201)
				.end(function(err, res) {
					expect(res.body.deleted).to.be.at.least(1)
					done(err);
				})
		})
		
		it('removes mutiple id\'s', function(done){
			var test = { id: [ data.non_admin.id, data.root_admin.id ] };

			request
				.delete(route + '/' + action.id + '/users' )
				.set('Authorization', data.non_admin.token)
				.send(test)
				.expect(201)
				.end(function(err, res) {
					expect(res.body.deleted).to.be.at.least(2)
					done(err);
				})
		})

		it('fails to remove fake id\'s', function(done){
			var test = { id: [ 'asdasdasd', 'uioiuiouiouiouiouioui', 'asdsadasdasdasdsdd' ] };

			request
				.delete(route + '/' + action.id + '/users' )
				.set('Authorization', data.non_admin.token)
				.send(test)
				.expect(201)
				.end(function(err, res) {
					expect(res.body.deleted).to.equal(0)
					done(err);
				})
		})
	})

	describe('Delete', function () {
		var action = data.test_action;

		it('won\'t work if you are logged out', function(done){
			request
				.delete(route + '/' + action.id)
				.expect(403)
				.expect(/You are not logged in./)
				.end(function(err, res){
					done(err);
				})
		})

		it('work if user created the action', function(done) {
			request
				.delete(route + '/' + action.id)
				.set('Authorization', data.non_admin.token)
				.expect(200)
				.expect(/deleted":1,"errors":0,"inserted":0,"replaced":0,"skipped":0,"unchanged":0/)
				.end(function(err, res){
					done(err);
				})
		});

	});

});