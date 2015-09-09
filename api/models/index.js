var fs = require('fs');

fs.readdirSync(__base+'/api/models').forEach(function (file) {
	if(file !== 'index.js') {
		file = file.split('.')[0];
		module.exports[file] = require('./' + file);
	}
});