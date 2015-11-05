var 	config = require(__base+'/config/config.js'),
		thinky = require(__base+'/config/thinky.js'),
		type = thinky.type,
		r = thinky.r,
		validator = require('validator');

module.exports = thinky.createModel("users",{
    id: type.string(),
    email: type.string().email().required(),
    first_name: type.string(),
    last_name: type.string(),
    password: type.string(),
    createdAt: type.date().default(r.now())
});

