global.__base = __dirname + '/';

var app = module.exports = require('koa')(),
	http = require('http'),
    config = require('./config/config'),
    middleware = require('./config/middleware'),
    mount = require('koa-mount'),
    socketIo  = require('socket.io'),
    M = require('./models'),
   	router = require('koa-router');

var server, io;

// Middleware
// app.use(middleware.logs);
app.use(middleware.cors);
app.use(middleware.errors);
app.use(middleware.permissions);
app.use(middleware.auth);
// app.use(middleware.render);

// HTTP routes
app.use(mount('/api/v1', require('./api/v1/routes')));

// Setup socket server
server = http.Server(app.callback());
io = socketIo(server);

// IO routes
require('./api/v1/controllers/io').activity(io);

// Listern to port
server.listen(config.port);



