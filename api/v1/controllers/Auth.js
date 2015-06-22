var   formidable = require('koa-formidable'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('co-bcrypt'),
      config = require('../../../config/config'),
      M = require('../../../models'),
      H = require('../../../config/helpers'),
      randomstring = require('randomstring'),
      secret = config.secret,
      thinky = require('thinky')(),
      r = thinky.r;


/**
 * @api {post} /api/v1/signup/ Signup
 * @apiName Signup
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email Users unique email.
 * @apiParam {String} password Users password.
 * @apiParam {String} first_name Users first name.
 * @apiParam {String} id Campaign id
 *
 * @apiSuccess {String} token Token for authentication purposes.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImU2YWZmZWNmLTcwNzUtNDIzNi04OGZkLTI1NzA5OWU2ZTcyZCIsImlhdCI6MTQzMjM1OTc1OH0.M7CHKDiP4kyWi0-ek0qukE1xRB9x7OExAMwX_Le1ZZY"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "You have already signed up."
 *     }
 */

module.exports.signup = function *() {

  var body = yield formidable.parse(this);

  // Make sure password is entered
  if(!body.fields.password) this.throw(403, 'You must fill out all fields to signup.');

  // check for existing user
  var id = yield H.userExists(body.fields.email);
  if(id) this.throw(400, 'You have already signed up.');

  // Create user
  var user = yield H.userCreate(body.fields);

  this.body = { token: jwt.sign({ id: user.id, email: user.email, name: user.first_name }, secret)  };
  this.status = 200;

};

/**
 * @api {post} /api/v1/login/ Login
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email Users unique email.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess {String} token Token for authentication purposes.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImU2YWZmZWNmLTcwNzUtNDIzNi04OGZkLTI1NzA5OWU2ZTcyZCIsImlhdCI6MTQzMjM1OTc1OH0.M7CHKDiP4kyWi0-ek0qukE1xRB9x7OExAMwX_Le1ZZY"
 *     }
 *
 * @apiError UserNotFound If you don't have an account, Please sign up.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "If you don't have an account, Please sign up."
 *     }
 */

module.exports.login = function *() {

  var body = yield formidable.parse(this);
  var user = yield M.User.filter({email: body.fields.email}).run();

  // Error is user doesn't exist
  if(user.length < 1) this.throw(404, "If you don't have an account, Please sign up.");

  // Error is password is incorrect
  var compare = yield bcrypt.compare(body.fields.password, user[0].password);
  if (!compare) this.throw(401, "Incorrect details.");

  this.body = { token: jwt.sign({id: user[0].id, email: user[0].email, name: user[0].first_name }, secret)  };
  this.status = 200;

};


/**
 * @api {post} /api/v1/reset/ Reset
 * @apiName Reset
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email Users unique email.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password has been reset"
 *     }
 *
 * @apiError UserNotFound This account does not exist. Please sign up.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "This account does not exist. Please sign up."
 *     }
 */

 module.exports.reset = function *() {

  var body = yield formidable.parse(this);
  var email = body.fields.email;

  // Check if email was passed as param
  if(!email) this.throw(403, 'The email field is required');

  // check for existing user
  var id = yield H.userExists(email);
  if(!id) this.throw(404, 'This account does not exist. Please sign up.');

  // Generate password
  var realPassword = randomstring.generate(7);

  // encrypt pass - concider putting in model pre function
  var salt = yield bcrypt.genSalt(10);
  var password = yield bcrypt.hash(realPassword, salt);

  // Update record
  var record = yield r.db(config.db.name).table(M.User.getTableName()).filter({email: email }).update({ password: password });

  // Send password email with realPassword

  this.body = {message: 'Password has been reset'};
  this.status = 200;  

 }
