'use strict';

// For connecting to mongodb with mongoose:
var mongoose = require('mongoose');

// Mongoose Models
var Pin = require('../models/pins');

// To send messages
const Bot = require('./bot');

const conString = process.env.CONNECTION_STRING;

class PinBook {

	static addPin(content) {
		mongoose.connect(conString);

		Pin.find((err, pins) => {
			var maxNumber = 0;

			if (pins.length > 0) {
				for (var i = 0; i < pins.length; i++) {
					if (pins[i].pinNumber > maxNumber) {
						maxNumber = pins[i].pinNumber;
					}
				}
			}

			var pin = new Pin({
						pinNumber: (maxNumber + 1),
						content: content });

			pin.save((err) => {
				if (err) {
					console.log("Error saving new pin to pins collection", err);
				}
			});
		});
	}

	static removePin() {
		mongoose.connect(conString);

	}

	static showPins() {
		mongoose.connect(conString);

		Pin.find((err, pins) => {
			if (err) {
				console.log("Error showing pins", err)
			}

			if (pins.length == 0) {
				var message = "There aren't any pins 🤷🏾‍♂️";
			}

			else {
				var message = 'Pins: \n\n';
				for (var i = 0; i < pins.length; i++) {
					message = message.concat(pins[i].pinNumber).concat(" - ").concat(pins[i].content).concat("\n");
				}
			}

			// Send message
			Bot.sendMessage(message);
		});
	}

	static clearPinBook() {
		mongoose.connect(conString);

	}

};

module.exports = PinBook;