var config = require('./config/config'),
	faker = require('faker');

var data = {};
	data.v = '/api/v1';
	data.root_admin = { email: config.admin, password: '1234', first_name: 'staticrootadmin' };
	data.potential_root_admin = { email: 'staticpotentialrootadmin@root.com', password: '124dsa', first_name: 'staticpotentialrootadmin' };
	data.admin = { email: 'staticadmin@testperson.com', password: '12343wefdf', first_name: 'staticcampaign admin' };
	data.potential_admin = { email: 'staticpotentialadmin@testperson.com', password: '123423df', first_name: 'staticpotentialadmin' };
	data.organiser = { email: 'staticorganiser@testperson.com', password: '12sfgs34', first_name: 'staticorganiser' };
	data.potential_organiser = { email: 'staticpotentialorganiser@testperson.com', password: '12sfasds34', first_name: 'staticpotentialorgniaser' };
	data.non_admin = { email: 'statictest@testperson.com', password: '1xzczx', first_name: 'statictesperson'};
	data.non_admin2 = { email: 'statictest2@testperasdson2.com', password: '1xzc2dxzx', first_name: 'statictestperson2'};


module.exports = {
	profiles: [],
	actions: [],
	campaigns: [],
	outcomes: [],
	regions: []	
}

module.exports.data = data;


module.exports.user = function() {

	return {
		email: 			faker.internet.email(), 
		password: 		faker.internet.password(),
		first_name: 	faker.name.firstName(),
	};

} 


module.exports.campaign = function() {

	return {
		title: 			faker.company.catchPhraseDescriptor() + " campaign", 
		description: 	faker.lorem.sentence()
	};

} 

module.exports.profile = function() {

	return {
		first_name: 	faker.name.firstName(),
		last_name: 		faker.name.lastName(),
		description: 	faker.lorem.sentence(),
		dob: 			faker.date.past(),
		job_title: 		faker.company.bsNoun(),
		religion: 		faker.company.bsNoun(),
		email:			faker.internet.email(),
		type: 			faker.company.catchPhraseNoun()
	}

}

module.exports.action = function() {

	return {
		title:			faker.company.catchPhrase(),
		description: 	faker.lorem.sentence(),
	    endDate: 		faker.date.future()
	}

}

module.exports.region = function() {

	return {
		title: 			faker.address.city(), 
		description: 	faker.lorem.sentence()
	}

}

module.exports.outcome = function() {

	return { 
		title: 			faker.company.catchPhraseNoun(), 
		description: 	faker.company.catchPhraseDescriptor(), 
		value: 			faker.random.number() 
	}

}

module.exports.note = function() {
	
	return { text: faker.lorem.sentences() }

}