function enquiry() {
	var config = require('../config.js')
	var db = require('../dbPool.js')

	this.insert = function(obj,cb) {
		console.log('callback',cb)
		db.client.collection('enquiries').insert(obj,function(err) {
			if(err) {
				return cb(err)
			}
			return cb(null)
		})
	}

}

module.exports = new enquiry()