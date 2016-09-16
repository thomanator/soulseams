var express = require('express')
var app = express()
var config = require('./config.js')

app.use(express.static(__dirname+'/public'))
require('./routes')(app)

app.listen(config.port,function() {	
	console.log('The app is listening on '+config.port)
})

