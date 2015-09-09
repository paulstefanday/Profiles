var app = require('./server'),
	request = require('co-supertest').agent(app.listen()),
	co = require('co'),
	H = require(__base+'/api/config/helpers'),
	M = require(__base+'/api/models'),
	_ = require('lodash'),
	config = require(__base+'/api/config/config'),
	thinky = require(__base+'/api/config/thinky.js'),
	r = thinky.r,
	fake = require('./mock.js'),
	jwt = require('jsonwebtoken'),
	amount = process.env.a ? process.env.a : 40;

co(function *(){

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

	// 
	for (var i = 1; i < amount; i++) {
		var profile = yield request.post(fake.data.v + '/activity').send(fake.activity()).end();
		fake.activities.push(profile.body);
	}

	console.log('Created ' + fake.profiles.length + ' profiles.')


	console.log('Token: ' + fake.data.admin.token, 'Activity: ' + fake.activities.length);
	process.exit()

}).catch(function(err){
	console.log(err);
	process.exit()
});


function rand(limit) {
	return Math.abs(Math.floor(Math.random() * limit));
}