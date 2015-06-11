var 	thinky = require('thinky')(),
		type = thinky.type,
		r = thinky.r,
		validator = require('validator');

module.exports = thinky.createModel("users",{
    id: type.string(),
    email: type.string().email().required(),
    first_name: type.string().required(),
    last_name: type.string(),
    password: type.string(),
    createdAt: type.date().default(r.now())
});

