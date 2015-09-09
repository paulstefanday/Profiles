var M = require(__base+'/models'),
	config = require(__base+'/config/config'),
	bcrypt = require('co-bcryptjs'),
	randomstring = require('randomstring'),
	thinky = require(__base+'/config/thinky.js'),
	r = thinky.r;

module.exports = {


	userExists: function* (email) { // Check if user exists

		var existingUser = yield M.User.filter({email: email }).run();

		// Check if response is an empty array and return id or false
		if(existingUser.length > 0) return existingUser[0];
		else return false;
	},


	userCreate: function* (data, provider) { // Create new user

		var user, doc, realPassword, password;

		if(provider) {

			user = new M.User({email: data.email, name: data.name, provider_id: data.id, provider: provider });
			doc = yield user.save();

		} else {

			// Set password if it's not set already
			if(data.password) realPassword = data.password;
			else realPassword = randomstring.generate(7);

			password = yield this.hashPassword(realPassword);

			// Update record
			user = new M.User({email: data.email, password: password, first_name: data.first_name });
			doc = yield user.save();

			// Send an email to user with their password

		}

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

