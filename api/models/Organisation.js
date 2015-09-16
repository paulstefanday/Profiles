var config = require(__base+'/config/config.js'),
    thinky = require(__base+'/config/thinky.js'),
		type = thinky.type,
		r = thinky.r,
		validator = require('validator'),
        hat = require('hat');

var Organisation = thinky.createModel("organisations", {
    id: type.string(),
    name: type.string(),
    email: type.string().email(),
    phone: type.string(),
    public: type.string(),
    private: type.string(),
    createdAt: type.date().default(r.now())
});

Organisation.pre('validate', function(next) {

    this.public = 'pub-' + hat();
    this.private = 'pri-' + hat();

    next();

});

module.exports = Organisation;

