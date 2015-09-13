// Controllers
var authCtrl = require('./controllers/Auth.js');
var profileCtrl = require('./controllers/Profile.js');
var orgCtrl = require('./controllers/Organisation.js');
var user = require(__base+'/config/permissions');
var router = require('koa-router');

var api = new router();

// Profile routes
api.post('/profile', profileCtrl.create);

// Organsaiton routes
api.get('/organisation', orgCtrl.find);
api.post('/organisation', orgCtrl.create);
api.get('/organisation/:organisation/profiles', orgCtrl.profiles);
api.put('/organisation/:organisation/join', orgCtrl.join);

// Auth Routes
api.post('/facebook', authCtrl.facebook);
api.post('/signup', authCtrl.signup);
api.post('/login', authCtrl.login);
api.post('/reset', authCtrl.reset);

module.exports = api.middleware();
