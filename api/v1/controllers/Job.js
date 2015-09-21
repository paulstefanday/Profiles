var   config = require(__base+'/config/config'),
	  M = require(__base+'/models/'),
	  thinky = require(__base+'/config/thinky.js'),
	  r = thinky.r;

var formidable = require('koa-formidable')

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

  body.user_id = this.user.id;

 	record = new M.Job(body);
 	result = yield record.save();

 	this.body = result;
 	this.status = 200;

 }


module.exports.image = function *() {
  var self = this,
      thunkify = require('thunkify-wrap'),
      form = yield formidable.parse(this),
      s3 = require('s3'),
      client = s3.createClient({ 
        s3Options: { 
          accessKeyId: 'AKIAITP7ZTGPG6RSZ3UA', 
          secretAccessKey: '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'
        }
      }),
      params = { localFile: form.files.file.path, s3Params: { Bucket: "purposecareer", Key: form.files.file.name } },
      uploader = client.uploadFile(params),
      upload = thunkify.event(uploader, 'end');

  yield upload();

  self.body = { url: 'https://s3-ap-southeast-2.amazonaws.com/purposecareer/' + form.files.file.name }
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
    jobs: true
  }).run();

  this.body = result.jobs || [];
  this.status = 200;
}

module.exports.update = function *() {
  var result = yield M.Job.get(this.params.job).update(this.request.body);

  this.body = result;
  this.status = 200
}

module.exports.delete = function *() {
  var result = yield M.Job.get(this.params.job).delete();
  console.log(result)
  this.body = {id: this.params.job};
  this.status = 200
}

