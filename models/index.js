var fs = require('fs');

fs.readdirSync('./models').forEach(function (file) {
	if(file !== 'index.js') {
		file = file.split('.')[0];
		module.exports[file] = require('./' + file);
	}
});