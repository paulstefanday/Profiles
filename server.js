'use strict';
var app = module.exports = require('koa')(),
    config = require('./config/config'),
    middleware = require('./config/middleware'),
    mount = require('koa-mount'),
    M = require('./models');
  	

// Middleware
app.use(middleware.cors);
app.use(middleware.errors);
app.use(middleware.permissions);
app.use(middleware.auth);

// Routes
app.use(mount('/api/v1', require('./api/v1/routes')));

app.listen(config.port);



