var   formidable = require('koa-formidable'),
      config = require('../../../config/config'),
      M = require('../../../models/');

/**
 * @api {get} /v1/import/nationbuilder Nationbuilder
 * @apiName Nationbuilder
 * @apiGroup Import
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

module.exports.nationbuilder = function *() {
  var body = yield formidable.parse(this);
  var result = yield M.Profile.run();
  this.body = result;
  this.status = 200;
}
