var co = require('co'),
	M = require('../../models'),
	config = require('../../config/config'),
	thinky = require('thinky')(),
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