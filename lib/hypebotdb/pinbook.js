'use strict';

// For connecting to mongodb with mongoose:
var mongoose = require('mongoose');

// Mongoose Models
var Pin = require('../../models/pins');

const conString = process.env.CONNECTION_STRING;

class PinBook {

	static addPin(content) {
		mongoose.connect(conString);

		Pin.find((err, pins) => {

			// To send messages
			const Bot = require('../bot');

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

			// Send message
			Bot.sendMessage("A pin has been added to the pinbook!");

		});
	}

	static removePin(pinnumber) {
		mongoose.connect(conString);

		Pin.find((err, pins) => {
			if (err) {
				console.log("Error in removePin", err)
			}

			// To send messages
			const Bot = require('../bot');

			var foundPin = false;
			var index = 0;
			for (var i = 0; i < pins.length; i++) {
				if (foundPin) {
					pins[i].pinNumber -= 1;
					pins[i].save((err) => {
						if (err) {
					  		console.log("Error chaging user tasks", err);
						}
					});
				}
				else if (pins[i].pinNumber.toString() === pinnumber) {
					index = i;
					foundPin = true;
				}
			}
			if (foundPin) {
				pins[index].remove((err) => {
					if (err) {
				  		console.log("removePin - Error in deleting pin from pins collection", err);
				  	}
				});
				Bot.sendMessage("Removed pin #".concat(pinnumber));
			}
			else {
				Bot.sendMessage("Pin #".concat(pinnumber).concat(" was not in the pinbook. I couldn't remove it."));
			}
		});
	}

	static showPins() {
		mongoose.connect(conString);

		Pin.find((err, pins) => {
			if (err) {
				console.log("Error showing pins", err)
			}

			// To send messages
			const Bot = require('../bot');

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

		Pin.find((err, pins) => {
			if (err) {
				console.log("Error showing pins", err)
			}

			// To send messages
			const Bot = require('../bot');

			if (pins.length == 0) {
				var message = "There aren't any pins to clear 🤷🏾‍♂️";
			}

			else {
				for (var i = 0; i < pins.length; i++) {
					pins[i].remove((err) => {
						if (err) {
							console.log("Error clearing pins", err);
						}
					});
				}
			}
			// Send message
			Bot.sendMessage("Pinbook has been cleared!");
		});

	}

};

module.exports = PinBook;