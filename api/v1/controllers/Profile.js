var   formidable = require('koa-formidable'),
      config = require('../../../config/config'),
      M = require('../../../models/'),
      thinky = require(__base+'/config/thinky.js'),
      r = thinky.r;

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
  var body = yield formidable.parse(this), record, result, activity;

  console.log(body)

  // Thorws an error if email and phone are both missing
  if( !body.fields.phone && !body.fields.email ) this.throw(403, 'Requires email or phone number')

  // Finds by email
  if(body.fields.email) record = yield M.Profile.filter({email: body.fields.email});

  // Finds by phone
  else if(body.fields.phone) record = yield M.Profile.filter({phone: body.fields.phone});

  // Get users IP

  
  if(record.length > 0) { // Updates record

    result = yield M.Profile.get(record[0].id).update(body.fields);
    activity = new M.Activity({ type: 'update', 'profileId': result.id, new: result, old: record[0] });
    activity = yield activity.save();

  } else { // Or creates a new one

    record = new M.Profile(body.fields);
    result = yield record.save();
    activity = new M.Activity({ type: 'create', 'profileId': result.id, new: result, old: {} });
    activity = yield activity.save();

  }

  this.body = result;
  this.status = 200;
}


// module.exports.update = function *() {
//   var body = yield formidable.parse(this), record, result;

//   result = yield M.Profile.get(this.params.profile).update(body.fields);

//   this.body = result;
//   this.status = 200;
// }