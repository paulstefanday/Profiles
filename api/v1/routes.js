// Controllers
var authCtrl = require('./controllers/Auth.js');
var jobCtrl = require('./controllers/Job.js');
var user = require(__base+'/config/permissions');
var router = require('koa-router');

var api = new router();

// Organsaiton routes
api.get('/job', jobCtrl.find);
api.post('/job', jobCtrl.create);
api.put('/job/:job', jobCtrl.update);
api.delete('/job/:job', jobCtrl.delete);

api.post('/image', jobCtrl.image);

// Auth Routes
api.post('/facebook', authCtrl.facebook);
api.post('/signup', authCtrl.signup);
api.post('/login', authCtrl.login);
api.post('/reset', authCtrl.reset);

module.exports = api.middleware();
