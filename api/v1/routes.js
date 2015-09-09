// Controllers
var authCtrl = require('./controllers/Auth.js');
var activityCtrl = require('./controllers/Activity.js');
var user = require(__base+'/api/config/permissions');
var router = require('koa-router');

var api = new router();

// Save activity
api.post('/activity', user.is('logged in'), activityCtrl.create);

// Auth Routes
api.post('/facebook', authCtrl.facebook);
api.post('/signup', authCtrl.signup);
api.post('/login', authCtrl.login);
api.post('/reset', authCtrl.reset);

module.exports = api.middleware();
