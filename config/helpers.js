var M = require('../models'),
	config = require('./config'),
	bcrypt = require('co-bcrypt'),
	randomstring = require('randomstring'),
	thinky = require(__base+'/config/thinky.js'),
	r = thinky.r;

module.exports = {

	// Check if user exists
	userExists: function* (email) {

		var existingUser = yield M.User.filter({email: email }).run();

		// Check if response is an empty array and return id or false
		if(existingUser.length > 0) return existingUser[0].id;
		else return false;
	},

	// Create new user
	userCreate: function* (data) {

		// Set password if it's not set already
		if(data.password) var realPassword = data.password;
		else var realPassword = randomstring.generate(7);

		var password = yield this.hashPassword(realPassword);

		// Update record
		var user = new M.User({email: data.email, password: password, first_name: data.first_name });
		var doc = yield user.save();

		// Send an email to user with their password


		return doc;

	},

	// Hash password
	hashPassword: function* (password) {
		
		// encrypt pass - concider putting in model pre function
		var salt = yield bcrypt.genSalt(10);
		var hash = yield bcrypt.hash(password, salt);

		return hash;
	}

}

