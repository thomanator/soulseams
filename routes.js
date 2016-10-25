var enquiry = require('./controllers/enquiry.js')
var goodDay = require('./controllers/goodDay.js')

module.exports = function(app) {
	app.post('/enquiry',enquiry.enquiry)
	app.post('/goodDayEnquiry',goodDay.enquiry)
}