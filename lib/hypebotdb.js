'use strict';

// For connecting to mongodb with mongoose:
var mongoose = require('mongoose');

// Mongoose Models
var User = require('../models/users');
//Task = require('../models/tasks');



const conString = process.env.CONNECTION_STRING;

/*
1) Recieve message
2) Check user
3) If user does not exist in users collection then make new profile
4) If message refers to tasks, look into tasks

*/

class TaskManager {

	// static showTasks() {
	// 	mongoose.connect(conString);

	// 	// return ALL THE TASKS
	// };

	// To add a new Knight to the TaskBook
	static newUser(sirname) {
		mongoose.connect(conString);

		User.findOne({sirName: sirname}, function (err, user) {
			if (err) {
				console.log("Error in newUser Query", err)
			}
			// To send messages
			const Bot = require('./bot');

			if (user) {
				// Dont add new user, they already exist
				Bot.sendMessage("Sir ".concat(sirname).concat(" already exists in the taskbook 🤷🏾‍♂️"));
			}
			else {
				var newusr = new User({ sirName: sirname,
								tasksCompleted: 0,
								totalTasks: 0,
								percentFinished: 0});

				newusr.save(function (err) {
				  // if (err) return handleError(err);
				  if (err) {
				  	console.log("Error in saving new user to db", err);
				  }
				  Bot.sendMessage("Added Sir ".concat(sirname).concat(" to the taskbook as \"").concat(sirname).concat("\"!"));
				  // saved!
				});
			}
		});
	};

	static deleteUser(sirname) {
		mongoose.connect(conString);

		User.findOne({sirName: sirname}, function (err, user) {
			if (err) {
				console.log("Error in deleteUser Query", err)
			}
			// To send messages
			const Bot = require('./bot');

			if (user) {
				// Remove the user because it was found
				user.remove(function (err) {
					if (err) {
				  	console.log("Error in deleting user from db", err);
				  }
				});
				Bot.sendMessage("Sir ".concat(sirname).concat(" was removed from the taskbook."));
			}
			else {
				Bot.sendMessage("Sir ".concat(sirname).concat(" was never in the taskbook. I couldn't remove him."));
			}
		});


	}



	// static newTask() {
	// 	mongoose.connect(conString);

	// 	// If User doesn't exist yet, send message back saying they don't exist and give instructions on how to add new user

	// 	// Add new task to the user


	// };



	// Remove task from list of tasks and 
	// static taskCompleted() {
	// 	mongoose.connect(conString);

	// };


	// static Taskformatter() {

	// };

};

module.exports = TaskManager;