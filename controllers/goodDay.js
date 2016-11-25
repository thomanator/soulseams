function goodDay() {
	var config = require('../config.js')
	var goodDayModel = require(config.dir+'/models/goodDay.js')

	this.enquiry = function(req,res) {
		var resJson = {
			status: 'failure',
			message: '',
			data: null
		}
		console.log('Coming to the good day controller')
		var obj = req.body
		console.log('Good day model',goodDayModel)
		goodDayModel.findOne(obj,function(item,err) {
			if(err) {
				resJson['message'] = err
				return res.json(resJson)
			}	
			console.log(item)
			if(item==null) {
				console.log('no item')
				goodDayModel.insert(obj,function(err) {
					if(err) {
						resJson['message'] = 'Oops! Looks like something went wrong.'
						return res.json(resJson)
					}
					resJson['status'] = 'success'
					return res.json(resJson)
				})
			}
			else {
				resJson['status'] = 'success'
				return res.json(resJson)
			}
		})
	}
}

module.exports = new goodDay()