function goodDay() {
	var config = require('../config.js')
	var goodDayModel = require(config.dir+'/models/goodDay.js')

	this.enquiry = function(req,res) {
		var resJson = {
			status: 'failure',
			message: '',
			data: null
		}
		var obj = req.body
		console.log('Good day model',goodDayModel)
		goodDayModel.insert(obj,function(err) {
			if(err) {
				resJson['message'] = err
				return res.json(resJson)
			}
			resJson['status'] = 'success'
			return res.json(resJson)
		})
	}
}

module.exports = new goodDay()