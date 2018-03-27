'use strict';

require('dotenv').config();

// For connecting to mongodb with mongoose:
var mongoose = require('mongoose');

const conString = process.env.CONNECTION_STRING;

class TaskManager {

	static testFunction() {

		/**
		 * Models 
		 */
		var User = mongoose.model("users", {
		    firstName: String,
		    lastName: String,
		    sirName: String
		})

		mongoose.connect(conString, () => {
		    console.log("DB is connected", conString)
		})

		var dummyUser = {
		    firstName: "Gabe",
		    lastName: "Rojas-Westall",
		    sirName: "Marchitar"
		}

		mongoose.connect(conString, () => {
		    console.log("DB is connected")
		    saveData()
		})
		function saveData() {
		    var user = new User(dummyUser);
		    user.save();
		}
	};

};

module.exports = TaskManager;