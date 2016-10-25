var mongo = require('mongodb').MongoClient

exports.init = function(cb) {
	mongo.connect('mongodb://localhost:27017/soulseams',function(err,db) {
		if(err) {
			return cb(err)
		}
		else {
			exports.client = db
			return cb(null)
		}
	})
}