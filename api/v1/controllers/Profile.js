var   formidable = require('koa-formidable'),
      config = require('../../../config/config'),
      M = require('../../../models/');

/**
 * @api {get} /api/v1/profile Get
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
  this.body = yield M.Profile.run();
  this.status = 200;
}

/**
 * @api {get} /api/v1/search Get
 * @apiName Get
 * @apiGroup Profiles
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} action Array of action objects
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */ 

module.exports.search = function *() {
  // this.body = yield M.Profile.run();
  // this.status = 200;
}

/**
 * @api {get} /api/v1/profile Create
 * @apiName Create
 * @apiGroup Profiles
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
  var body = yield formidable.parse(this), record, result;

  // Thorws an error if email and phone are both missing
  if( !body.fields.phone && !body.fields.phone ) this.throw(403, 'Requires email or phone number')

  // Finds by email
  if(body.fields.email) record = yield M.Profile.filter({email: body.fields.email});

  // Finds by phone
  else if(body.fields.phone) record = yield M.Profile.filter({phone: body.fields.phone});

  // Get users IP


  // Updates record
  if(record) result = yield M.Profile.get(record.id).update(body.fields);

  // Or creates a new one
  else {
    record = new M.Profile(body.fields);
    result = yield record.save();
  }

  this.body = result;
  this.status = 200;
}