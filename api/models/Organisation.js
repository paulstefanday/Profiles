var config = require(__base+'/config/config.js'),
    thinky = require(__base+'/config/thinky.js'),
		type = thinky.type,
		r = thinky.r,
		validator = require('validator');

module.exports = thinky.createModel("organisations", {
    id: type.string(),
    name: type.string(),
    email: type.string().email(),
    phone: type.string(),
    public: type.string(),
    private: type.string(),
    createdAt: type.date().default(r.now())
});

User.pre('init', function(next) {
    // if (this.age < 18) {
    //     next(new Error("A user must be at least 18 years old."));
    // }
    // else {
    //     next();
    // }
});
