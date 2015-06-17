var config = require('./config/config'),
	Chance = require('chance'),
    chance = new Chance();

var data = {};
	data.v = '/api/v1';
	data.admin = { email: config.admin, password: '1234', first_name: 'rootadmin' };

module.exports = {
	profiles: []
}

module.exports.data = data;


module.exports.user = function() {

	return {
	};

}

module.exports.profile = function() {

	return {
	    first_name: chance.first(),
	    last_name: chance.last(),
	    phone: chance.phone(),
	    address: chance.address(),
	    postcode: chance.pick([2073, 2016, 4000, 3020]),
	    city: chance.city(),
	    location: [chance.longitude(), chance.latitude()],
	    locations: [ [chance.longitude(), chance.latitude()] ], //chance.unique([chance.latitude(), chance.longitude()], 5),
	    ip: chance.ip(),
	    dob: chance.birthday(),
	    job_title: chance.pick(['Overlord', 'Head of cat cuddling', 'Senior Cat cuddler', 'Thai food tester', 'Fart donator', 'Senior VP of farts', 'Head of naps']),
	    gender: chance.gender(),
	    email: chance.email(),
	}

}
