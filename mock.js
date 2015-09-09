var config = require('./config/config'),
	Chance = require('chance'),
    chance = new Chance(),
    _ = require('lodash');

var data = {};
	data.v = '/api/v1';
	data.admin = { email: config.admin, password: '1234', first_name: 'rootadmin' };

module.exports = {
	activities: [],
	users: []
}

module.exports.data = data;


module.exports.user = function() {

	return {
		first_name: chance.first(),
	    last_name: chance.last(),
	    email: chance.email(),
	    password: chance.string({length: 8})
	};

}

module.exports.activtiy = function() {

	return {
	    ip: chance.ip(),
	    data: chance.pick(['Overlord', 'Head of cat cuddling', 'Senior Cat cuddler', 'Thai food tester', 'Fart donator', 'Senior VP of farts', 'Head of naps']),
	}

}
