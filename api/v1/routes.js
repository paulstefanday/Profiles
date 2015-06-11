// Controllers
var authCtrl = require('./controllers/Auth.js');
var profileCtrl = require('./controllers/Profile.js');
var user = require('../../config/permissions');
var router = require('koa-router');

var api = new router();

// Save profile
api.post('/profile', profileCtrl.create);

// Query profiles
api.get('/profile', user.is('logged in'), profileCtrl.find);

// Get search query params
api.get('/search', profileCtrl.search);

// Auth Routes
api.post('/signup', authCtrl.signup);
api.post('/login', authCtrl.login);
api.post('/reset', authCtrl.reset);

module.exports = api.middleware();