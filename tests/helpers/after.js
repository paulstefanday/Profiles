var co = require('co'),
	M = require(__base+'/api/models'),
	config = require(__base+'/api/config/config'),
	thinky = require(__base+'/api/config/thinky.js'),
	r = thinky.r;

module.exports = function(done) { 

	co(function *(){
		
		// remove all records
		var tables = yield r.db('test').tableList().forEach(function(name){
			return r.table(name).delete()
		})

		// console.log(tables);

		done();

	}).catch(function(err){
		console.log(err);
	});
}