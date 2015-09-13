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

 	var body = this.request.body, record, result, relation;

 	record = new M.Organisation(body);
 	result = yield record.save();
  relation = yield r.table('organisations_users').insert({organisations_id: record.id, users_id: this.user.id })

 	this.body = result;
 	this.status = 200;

 }

 module.exports.join = function *() {

 }

/**
 * @api {get} /v1/profile Get
 * @apiName Get
 * @apiGroup Profiles
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} action Array of action objects
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *          id: 'asdasdasdasdasdsadad'
 *     }]
 *
 */

module.exports.find = function *() {

  var result = yield M.User.get(this.user.id).getJoin({
    organisations: true
  }).run();

  this.body = result.organisations || [];
  this.status = 200;
}

// api/v1/organisation/:organisation/profiles

module.exports.profiles = function *() {

  var result = yield M.User.get(this.user.id).getJoin({
    organisations: {
      _apply: sequence => sequence.find(this.params.organisation),
      profiles: true
    }
  }).run();

  this.body = result.organisations[0].profiles || [];
  this.status = 200;
}
