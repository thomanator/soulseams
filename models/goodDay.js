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
}

module.exports = new goodDayModel() 