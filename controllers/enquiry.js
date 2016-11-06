function enquiry() {
	var async = require('async')
	var config = require('../config.js')
	var enquiryModel = require(config.dir+'/models/enquiry.js')
	var nodemailer = require('nodemailer')
	


	this.enquiry = function(req,res) {
		console.log('enquiry model',enquiryModel)
		console.log('Request body',req.body)
		var resJson = {
			status: 'failure',
			message: '',
			data: null
		}	
		var obj = req.body
		async.parallel([
			selfMail.bind(null,obj),
			customerMail.bind(null,obj),
			enquiryModel.insert.bind(null,obj)
		],function(err) {
			if(err) {
				resJson['message'] = 'Our application failed, sorry about that mate!'
				return res.json(resJson)
			}
			resJson['status'] = 'success'
			return res.json(resJson)
		})
	}

	function selfMail(obj,cb) {
		var text = 'Customer name: '+obj.name+'\n'+'Customer email: '+obj.email+'\n'+'Customer number: '+obj.number+'\n'+'Description: '+obj.description
		var smtpTransport = require("nodemailer-smtp-transport")
		console.log('Smtp transport',smtpTransport)
		var smtpTransport = nodemailer.createTransport(smtpTransport({
		    service: 'gmail',
		    auth : {
		        user : "soulseams@gmail.com",
		        pass : ""
		    }
		}))		


		var mailOptions = {
			from : "soulseams@gmail.com",
	        to : "soulseams@gmail.com",
	        subject : "New Enquiry",
	        text : text,
		}

		smtpTransport.sendMail(mailOptions, function(error, response){
	        if(error){
	        	console.log('error',error)
	            return cb(error)
	        }
	        else{
	        	console.log('response',response)
	        	return cb(null)    
	        }
	    })		
	}

	function customerMail(obj,cb) {
		var text = 'Thanks for reaching out to us. Someone from our team will be reaching out to you very soon'+'\n\n'+'We make clothes that matter,'+'Soul Seams'
		var smtpTransport = require("nodemailer-smtp-transport")
		var smtpTransport = nodemailer.createTransport(smtpTransport({
		    service: 'gmail',
		    auth : {
		        user : "soulseams@gmail.com",
		        pass : ""
		    }
		}))		


		var mailOptions = {
			from : "soulseams@gmail.com",
	        to : obj.email,
	        subject : "Soul Seams Enquiry",
	        text : text,
		}

		smtpTransport.sendMail(mailOptions, function(error, response){
	        if(error){
	        	console.log('error',error)
	            return cb(error)
	        }
	        else{
	        	return cb(null)    
	        	console.log('response',response)
	        }
	    })	
	}
}

module.exports = new enquiry()
