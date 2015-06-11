var config = require('../../config/config');
var data = {};
	data.v = '/api/v1';
	data.root_admin = { email: config.admin, password: '1234asdsa', first_name: 'rootadmin' };
	data.potential_root_admin = { email: 'potentialrootadmin@root.com', password: '1234asdsa', first_name: 'potentialrootadmin' };
	data.admin = { email: 'admin@testperson.com', password: '1234423wefdf', first_name: 'campaign admin' };
	data.potential_admin = { email: 'potentialadmin@testperson.com', password: '123423wefdf', first_name: 'potentialadmin' };
	data.organiser = { email: 'organiser@testperson.com', password: '12sfgsfs34', first_name: 'organiser' };
	data.potential_organiser = { email: 'potentialorganiser@testperson.com', password: '12sfasdagsfs34', first_name: 'potentialorgniaser' };
	data.non_admin = { email: 'test@testperson.com', password: '1xzc234zxzx', first_name: 'tesperson'};
	data.non_admin2 = { email: 'test2@testperasdson2.com', password: '1xzc234zasdxzx', first_name: 'testperson2'};
	
	data.test_campaign = {
		title: "Murray's awesome campaign", 
		description: "The amazing world changing campaign of the century!"
	};
	
	data.test_profile = {
		first_name: 'Paul',
		last_name: 'Keating',
		description: 'Did lots of stuff...',
		dob: new Date(),
		job_title: 'Inchange of stuff',
		religion: 'Catholic',
		email: 'paul@keating.com',
		type: 'Retired Politician'
	},
	
	data.test_action = {
		title:			'Take on Tony!',
		description: 	'Do a bunch of things and solve all the problems!',
	    endDate: 		new Date(),
	},
	
	data.test_region = {
		title: 'South Sydney~!!!!!!', 
		description: 'This is a test description' 
	},

	data.test_outcomes = [
	    { title: 'A Tweet', description: 'Put your thoughts on twitter!', value: 20 },
	    { title: 'An Email', description: 'Tell someone what you think!', value: 10 },    
	    { title: 'A phone call', description: ' call blah blah at 06541345', value: 110 }
	],

	data.test_notes = [
		{ text: 'Sed ut perspiciatis undeoremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. '},
		{ text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantiumm aperiam, eaque ipsa quae ab illo inventa sunt explicabo.'},
		{ text: 'Aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'}
	],
	
	data.campaign_id;

module.exports = data;