var 	config = require(__base+'/config/config.js'),
		thinky = require(__base+'/config/thinky.js'),
		type = thinky.type,
		r = thinky.r,
		validator = require('validator');

module.exports = thinky.createModel("records",{
    id: type.string(),
    profileId: type.string()
});

