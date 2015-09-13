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
   	bodyParser = require('koa-bodyparser'), server, io;

// Relations
M.User.hasAndBelongsToMany(M.Organisation, "organisations", "id", "id");
M.Organisation.hasAndBelongsToMany(M.User, "users", "id", "id");

M.Profile.hasAndBelongsToMany(M.Organisation, "organisations", "id", "id");
M.Organisation.hasAndBelongsToMany(M.Profile, "profiles", "id", "id");

// Middleware
app.use(bodyParser());
// app.use(middleware.logs);
app.use(serve('./public'))
app.use(middleware.cors);
app.use(middleware.errors);
app.use(middleware.permissions);
app.use(middleware.auth);

// HTTP routes
app.use(mount('/api/v1', require('./v1/routes')));

// Client
app.use(route.get('/*', function *() { this.body = yield render('./client/index.jade'); }));

// Sockets
server = require('http').createServer(app.callback());
io = require('socket.io')(server);
require('./v1/controllers/io').activity(io);

// Listen
server.listen(config.port);



