global.__base = __dirname + '/';

var app = module.exports = require('koa')(),
    config = require(__base+'/config/config'),
    middleware = require(__base+'/config/middleware'),
    mount = require('koa-mount'),
    M = require(__base+'/models'),
   	route = require('koa-route'),
   	render = require('co-render'),
   	session = require('koa-session'),
    Grant = require('grant-koa'),
    serve = require('koa-static-folder'),
   	bodyParser = require('koa-bodyparser');

var server, io;

// Middleware
app.use(bodyParser());
app.use(middleware.logs);
app.use(serve('./public'))
app.use(middleware.cors);
app.use(middleware.errors);
app.use(middleware.permissions);
app.use(middleware.auth);

// Client
app.use(route.get('/*', function *() { this.body = yield render('./client/index.jade'); }));

// HTTP routes
app.use(mount('/api/v1', require('./v1/routes')));

// Sockets
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
require('./v1/controllers/io').activity(io);

// Listen
server.listen(config.port);



