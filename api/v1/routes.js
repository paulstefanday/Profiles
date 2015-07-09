// Controllers
var authCtrl = require('./controllers/Auth.js');
var profileCtrl = require('./controllers/Profile.js');
var importCtrl = require('./controllers/Import.js');
var user = require('../../config/permissions');
var router = require('koa-router');

var api = new router();

// Save profile
api.post('/profile', profileCtrl.create);
// api.put('/profile/:profile', profileCtrl.update);
// api.get('/profile', user.is('logged in'), profileCtrl.find);

// Get search query params
// api.get('/search', profileCtrl.search);

// import
api.get('/import/nationbuilder', importCtrl.nationbuilder);

// Auth Routes
api.post('/signup', authCtrl.signup);
api.post('/login', authCtrl.login);
api.post('/reset', authCtrl.reset);

module.exports = api.middleware();