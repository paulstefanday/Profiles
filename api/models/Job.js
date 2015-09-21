var 	config = require(__base+'/config/config.js'),
        thinky = require(__base+'/config/thinky.js'),
		type = thinky.type,
		r = thinky.r,
		validator = require('validator');

module.exports = thinky.createModel("jobs", {
    id: type.string(),
    user_id: type.string(),
    organisation_name: type.string(),
    organisation_logo: type.string(),
    open: type.date(),
    close: type.date(),
    start: type.date(),
    work_type: type.date(),
    title: type.string(),
    description: type.string(),
    role: type.string(),
    salery_avg: type.number(),
    salery_max: type.number(),
    salery_max: type.number(),
    apply_instructions: type.string(),

    address: type.string(),
    postcode: type.number(),
    state: type.string(),
    country: type.string(),
    city: type.string(),
    location: type.point(),

    createdAt: type.date().default(r.now())
});

