function goodDayModel() {
	var db = require('../dbPool.js')

	this.insert = function(obj,cb) {
		db.client.collection('goodDay').insert(obj,function(err) {
			if(err) {
				return cb(err)
			}
			return cb(null)
		})
	}

	this.findOne = function(selectCriteria,cb) {
		db.client.collection('goodDay').findOne(selectCriteria,function(err,obj) {
			if(err) {
				return cb(err)
			}
			return cb(obj,null)
		})
	}
}

module.exports = new goodDayModel() 