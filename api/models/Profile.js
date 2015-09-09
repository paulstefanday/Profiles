var 	config = require(__base+'/api/config/config.js'),
        thinky = require(__base+'/api/config/thinky.js'),
		type = thinky.type,
		r = thinky.r,
		validator = require('validator');

module.exports = thinky.createModel("profiles", {
    id: type.string(),
    first_name: type.string(),
    last_name: type.string(),
    email: type.string().email(),
    phone: type.string(),

    address: type.string(),
    postcode: type.number(),
    city: type.string(),
    location: type.point(),

    // locations: type.array().schema(type.point()).default([]),

    ip: type.string(),

    dob: type.date(),
    job_title: type.string(),
    gender: type.string(),

    createdAt: type.date().default(r.now())
});

