var jwt = require('jsonwebtoken'),
    config = require('./config'),
    // jade = require('koa-jade'),
    secret = config.secret;


module.exports.logs = function* (next) {
  console.info('-->', this.method, this.url, 'ip', this.ip, 'ips', this.ips)
  var start = Date.now()
  yield next
  console.info('<--', this.method, this.url, this.res.statusCode, (Date.now() - start) + 'ms')
}

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

// module.exports.render = function* (next) {
//   return jade.middleware({
//     viewPath: __base + '/frontend',
//     debug: true
//   })
// }

module.exports.permissions = require('./permissions').middleware();

module.exports.cors = require('kcors')({ 'Access-Control-Allow-Credentials': true });