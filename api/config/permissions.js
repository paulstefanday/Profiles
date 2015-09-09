var Roles = require('koa-roles'),
	config = require(__base+'/api/config/config'),
	thinky = require(__base+'/api/config/thinky'),
	type = thinky.type,
	r = thinky.r,
	formidable = require('koa-formidable'),
	validator = require('validator'),
	_ = require('lodash'),
	M = require(__base+'/api/models');


// Error handling
var user = new Roles({
	failureHandler: function *(action) {
		this.status = 403;
		this.body = {
		  message: 'Access Denied - You are not ' + action + '.'
		};
	}
});


// Roles
user.use('logged in', function (action) {
	if (this.user) return true;
})


module.exports = user;


