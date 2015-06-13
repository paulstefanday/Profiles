var 	thinky = require('thinky')(),
		type = thinky.type,
		r = thinky.r,
		validator = require('validator');

module.exports = thinky.createModel("profiles", {
    id: type.string(),
    first_name: type.string(),
    last_name: type.string(),
    phone: type.string(),
    address: type.string(),
    postcode: type.number(),
    location: type.point(),
    locations: type.point(),
    ip: type.string(),
    dob: type.date(),
    job_title: type.string(),
    email: type.string().email(),
    createdAt: type.date().default(r.now())
});

