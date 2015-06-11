var app = require('./server'),
	request = require('co-supertest').agent(app.listen()),
	co = require('co'),
	H = require('./config/helpers'),
	M = require('./models'),
	_ = require('lodash'),
	config = require('./config/config'),
	thinky = require('thinky')(),
	r = thinky.r,
	fake = require('./faker.data.js'),
	jwt = require('jsonwebtoken');


co(function *(){

	// create admin account
	var res3 = yield request.post(fake.data.v + '/signup/').send(fake.data.root_admin).end();
	fake.data.root_admin.token = res3.body.token;
	fake.data.root_admin.id = jwt.verify(res3.body.token, config.secret).id;

	// create a campaign
	var res4 = yield request.post(fake.data.v + '/campaign').set('Authorization', fake.data.root_admin.token).send(fake.campaign()).end();
	fake.data.global_campaign_id = res4.body.id;

	// non admin user
	var res1 = yield request.post(fake.data.v + '/signup/').send(fake.data.non_admin).end();
	fake.data.non_admin.token = res1.body.token;
	fake.data.non_admin.id = jwt.verify(res1.body.token, config.secret).id;

	// non admin user 2
	var res0 = yield request.post(fake.data.v + '/signup/').send(fake.data.non_admin2).end();
	fake.data.non_admin2.token = res0.body.token;
	fake.data.non_admin2.id = jwt.verify(res0.body.token, config.secret).id;

	// admin user
	var res2 = yield request.post(fake.data.v + '/signup/').send(fake.data.admin).end();
	fake.data.admin.token = res2.body.token;
	fake.data.admin.id = jwt.verify(res2.body.token, config.secret).id;

	// create profiles
	for (var i = 1; i < 20; i++) {
		var profile = yield request.post(fake.data.v + '/campaign/' + fake.data.global_campaign_id + '/profile').set('Authorization', fake.data.root_admin.token).send(fake.profile()).end();
		fake.profiles.push(profile.body);
	}

	// create regions
	for (var i = 1; i < 5; i++) {
		var region = yield request.post(fake.data.v + '/campaign/' + fake.data.global_campaign_id + '/region').set('Authorization', fake.data.root_admin.token).send(fake.region()).end();
		fake.regions.push(region.body);
	}

	// create actions
	for (var i = 1; i < 5; i++) {
		var action = yield request.post(fake.data.v + '/campaign/' + fake.data.global_campaign_id + '/action').set('Authorization', fake.data.root_admin.token).send(fake.action()).end();
		fake.actions.push(action.body);
	}
	
	// create outcomes
	for (var i = 1; i < 10; i++) {
		var outcome = yield request.post(fake.data.v + '/campaign/' + fake.data.global_campaign_id + '/outcome').set('Authorization', fake.data.root_admin.token).send(fake.outcome()).end();
		fake.outcomes.push(outcome.body);
	}



	// create region admin action
	// console.log(fake);
	process.exit()

}).catch(function(err){
	console.log(err);
	process.exit()
});

