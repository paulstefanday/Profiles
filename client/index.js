var io = require('socket.io-client'),
    angular = require('angular'),
    name = 'app';

require('angular-socket-io');
require('angular-ui-router');
require('angular-animate');
require('satellizer');
require('sweetalert');
require('angular-sweetalert');
require('ladda-angular');
require('ngmap');

// App
angular.module(name, [
	'satellizer',
	'btford.socket-io',
	'ui.router',
  'ngAnimate',
	'oitozero.ngSweetAlert',
  'ladda',
  'ngMap'
])
  .config(require('./config'))
  .run(require('./global'))


// App Parts
require('./bootstrap')(name)
	.directive(...require('./directives/map'))
  .directive(...require('./directives/nav'))
	.factory('socket', /*@ngInject*/ function(socketFactory) {
		return socketFactory({ prefix: '', ioSocket: io.connect('http://localhost:3000/') })
	})









