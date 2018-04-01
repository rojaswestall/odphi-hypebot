'use strict';

// For connecting to mongodb with mongoose:
var mongoose = require('mongoose');

// Mongoose Models
var Pin = require('../models/pins');

const conString = process.env.CONNECTION_STRING;

class PinBook {

	static addPin() {

	}

	static removePin() {

	}

	static clearPinBook() {
		
	}

};


module.exports = PinBook;