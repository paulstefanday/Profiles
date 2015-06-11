var H = require('../../config/helpers'),
	M = require('../../models'),
	_ = require('lodash'),
	config = require('../../config/config'),
	thinky = require('thinky')(),
	r = thinky.r,
	data = require('./data');

module.exports = function *(request) {

			// create admin account
			var userData = _.clone(data.root_admin, true);
			userData.password = yield H.hashPassword(userData.password);
			var userNew = new M.User(userData);
			var userRecord = yield userNew.save();
			data.root_admin.id = userRecord.id;
			// get admin token

			var res3 = yield request.post(data.v + '/login/').send(data.root_admin).end();
			data.root_admin.token = res3.body.token;

			// create a campaign
			var res4 = yield request.post(data.v + '/campaign').set('Authorization', data.root_admin.token).send(data.test_campaign).end();
			data.global_campaign_id = res4.body.id;

			// non admin user
			var userData = _.clone(data.non_admin, true);
			userData.password = yield H.hashPassword(userData.password);
			var userNew = new M.User(userData);
			var userRecord = yield userNew.save();
			data.non_admin.id = userRecord.id;

			var res1 = yield request.post(data.v + '/login/').send(data.non_admin).end();
			data.non_admin.token = res1.body.token;

			// non admin user 2
			var userData = _.clone(data.non_admin2, true);
			userData.password = yield H.hashPassword(userData.password);
			var userNew = new M.User(userData);
			var userRecord = yield userNew.save();
			data.non_admin2.id = userRecord.id;

			var res0 = yield request.post(data.v + '/login/').send(data.non_admin2).end();
			data.non_admin2.token = res0.body.token;

			// admin user
			var userData = _.clone(data.admin, true);
			userData.password = yield H.hashPassword(userData.password);
			var userNew = new M.User(userData);
			var userRecord = yield userNew.save();
			data.admin.id = userRecord.id;

			var res2 = yield request.post(data.v + '/login/').send(data.admin).end();
			data.admin.token = res2.body.token;

			// create a profile
			var res5 = yield request.post(data.v + '/campaign/' + data.global_campaign_id + '/profile').set('Authorization', data.root_admin.token).send(data.test_profile).end();
			data.test_profile.id = res5.body.id;
			data.test_action.profileId = res5.body.id;

			// create region
			var res6 = yield request.post(data.v + '/campaign/' + data.global_campaign_id + '/region').set('Authorization', data.root_admin.token).send(data.test_region).end();
			data.test_region.id = res6.body.id;

			// create action
			var res7 = yield request.post(data.v + '/campaign/' + data.global_campaign_id + '/action').set('Authorization', data.non_admin.token).send(data.test_region).end();
			data.test_action.id = res7.body.id;

			// create a bunch of outcomes
			var outcome1 = yield request.post(data.v + '/campaign/' + data.global_campaign_id + '/outcome').set('Authorization', data.root_admin.token).send(data.test_outcomes[0]).end();
			data.test_outcomes[0].id = outcome1.body.id;

			var outcome2 = yield request.post(data.v + '/campaign/' + data.global_campaign_id + '/outcome').set('Authorization', data.root_admin.token).send(data.test_outcomes[1]).end();
			data.test_outcomes[1].id = outcome2.body.id;

			// create region admin action

			return data;

	}