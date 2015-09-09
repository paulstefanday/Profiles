var   config = require(__base+'/config/config'),
	  M = require(__base+'/models/'),
	  thinky = require(__base+'/config/thinky.js'),
	  r = thinky.r;


/**
 * @api {get} /v1/activity Create
 * @apiName Create
 * @apiGroup Activity
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} id ID of user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { id: 'asdadasdsdadasdad' }
 *
 */

 module.exports.create = function *() {

 	var body = this.request.body, record, result;

 	body.ip = this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress;
 	body.userId = this.user.id;

 	console.log(body);

 	record = new M.Activity(body);
 	result = yield record.save();

 	this.body = result;
 	this.status = 200;

 }
