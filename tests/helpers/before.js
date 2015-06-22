var co = require('co'),
	H = require('../../config/helpers'),
	M = require('../../models'),
	_ = require('lodash'),
	config = require('../../config/config'),
	thinky = require('thinky')(),
	r = thinky.r,
	fake = require('../../mock.js'),
	jwt = require('jsonwebtoken'),
	amount = process.env.a ? process.env.a : 40;

module.exports = function *(request) {

	// cleaned database
	var tables = yield r.db('test').tableList().forEach(function(name){
		return r.table(name).delete()
	})

	console.log('All tables cleared')

	// create admin account
	var admin = yield request.post(fake.data.v + '/signup/').send(fake.data.admin).end();
	fake.data.admin.token = admin.body.token;
	fake.data.admin.id = jwt.verify(admin.body.token, config.secret).id;

	console.log('Created admin')

	// create users
	for (var i = 1; i < amount; i++) {
		var user = fake.user(),
			res = yield request.post(fake.data.v + '/signup').send(user).end();
		
		user.token = res.body.token;
		fake.users.push(user);
	}

	console.log('Created ' + fake.users.length + ' users.')

	// create profiles
	for (var i = 1; i < amount; i++) {
		var profile = yield request.post(fake.data.v + '/profile').send(fake.profile()).end();
		fake.profiles.push(profile.body);
	}

	console.log('Created ' + fake.profiles.length + ' profiles.')

	return fake;

}