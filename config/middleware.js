var jwt = require('jsonwebtoken'),
    config = require('./config'),
    secret = config.secret;

module.exports.errors = function *(next){
  try {
    yield next;
  } catch (err) {
    this.body = { message: err.message };
    this.status = err.status || 500;
    this.app.emit('error', err, this);
  }
}

// Auth
module.exports.auth = function* (next) {

  var token = this.get('Authorization');

  if (token) {
    try {
      this.user = jwt.verify(token, secret); 
    } catch(err){
      console.log(err)
    }
  }
  
  yield next;

}

module.exports.permissions = require('./permissions').middleware();

module.exports.cors = require('kcors')();