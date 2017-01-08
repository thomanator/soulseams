var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var dbPool = require('./dbPool').init
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())


require('./routes.js')(app)
app.listen(7001,function() {
  console.log('The app is running on port 7001')
})



// require('./routes.js')(app)
// dbPool(function(err) {
//   if(err) {
//   	console.log('Error with db',err)
//   }
//   else {
//  	app.listen(7000,function() {
//  		console.log('The app is running on port 7000')
//   	})
//   }
// })


