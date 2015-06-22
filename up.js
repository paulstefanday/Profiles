var app = require('./server'),
	request = require('co-supertest').agent(app.listen()),
	co = require('co'),
	H = require('./config/helpers'),
	M = require('./models'),
	_ = require('lodash'),
	config = require('./config/config'),
	thinky = require('thinky')(),
	r = thinky.r,
	fake = require('./mock.js'),
	jwt = require('jsonwebtoken'),
	amount = process.env.a ? process.env.a : 40;

co(function *(){

	// create admin account
	var admin = yield request.post(fake.data.v + '/signup/').send(fake.data.admin).end();
	fake.data.admin.token = admin.body.token;
	fake.data.admin.id = jwt.verify(admin.body.token, config.secret).id;

	// create users
	for (var i = 1; i < amount; i++) {
		var user = fake.user();
		var res = yield request.post(fake.data.v + '/signup').send(user).end();
		user.token = res.body.token;
		fake.users.push(user);
	}

	// create profiles
	for (var i = 1; i < amount; i++) {
		var profile = yield request.post(fake.data.v + '/profile').send(fake.profile()).end();
		fake.profiles.push(profile.body);
	}

	console.log('Token: ' + fake.data.admin.token, 'Profiles: ' + fake.profiles.length);
	process.exit()

}).catch(function(err){
	console.log(err);
	process.exit()
});


function rand(limit) {
	return Math.abs(Math.floor(Math.random() * limit));
}