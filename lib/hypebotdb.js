'use strict';

// For connecting to mongodb with mongoose:
var mongoose = require('mongoose');

// Mongoose Models
var User = require('../models/users');
var Task = require('../models/tasks');



const conString = process.env.CONNECTION_STRING;

/*
1) Recieve message
2) Check user
3) If user does not exist in users collection then make new profile
4) If message refers to tasks, look into tasks
*/

class TaskManager {

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
								percentFinished: 0,
								currentTaskNumber: 0});

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


	// Deleting a Knight from the taskbook
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
				Bot.sendMessage("Sir ".concat(sirname).concat(" was not in the taskbook. I couldn't remove him."));
			}
		});
	}


	// Adding a new task to the taskbook for a specific user
	static newTask(sirname, taskstr) {
		mongoose.connect(conString);

		User.findOne({sirName: sirname}, function (err, user) {
			if (err) {
				console.log("Error in adding newTask", err)
			}

			// To send messages
			const Bot = require('./bot');

			if (user) {
				var currentTask = user.currentTaskNumber + 1;

				// Create Task
				var task = new Task({ taskNumber: currentTask, 
									  task: taskstr,
									  userID: user });

				// Save task to database in tasks collection
				task.save(function (err) {
					if (err) {
				  	console.log("Error saving tasks to tasks collection", err);
				  }
				});

				// Add task to users collection for that user and update currentTaskNumber, totalTasks, and percentFinished
				user.currentTaskNumber = currentTask;
				user.totalTasks += 1;
				user.tasks.push(task);
				user.save(function (err) {
					if (err) {
				  	console.log("Error pushing the task to the list of tasks", err);
				  }
				});

				// Send message to the group notifying that the task has been added
				Bot.sendMessage("Added task to the taskbook for Sir ".concat(sirname));

			}

			else {
				Bot.sendMessage("Sir ".concat(sirname).concat(" was not in the taskbook. To add a bro try \"New Knight - KNIGHT_NAME\""));
			}

		});
	};

	static showTasks() {
		mongoose.connect(conString);

		User.find(function(err, users) {
			if (err) {
				console.log("Error in finding users for showTasks", err)
			}

			// To send messages
			const Bot = require('./bot');

			// Construct message
			var message = '';
			for (var i = 0; i < users.length; i++) {
				message = message.concat(users[i].sirName).concat(": \n");

				if (users[i].tasks.length == 0) {
					message = message.concat("   No tasks : ) \n");
				}
				else {
					for (var j = 0; j < users[i].tasks.length; j++) {
						message = message.concat("   ").concat(users[i].tasks[j].taskNumber).concat(" - ").concat(users[i].tasks[j].task).concat("\n");
					}
				}
			}
			
			// Send message
			Bot.sendMessage(message);

		});
	};

	// static updatePercentFinished() {
	// 	mongoose.connect(conString);
	// }



	// Remove task from list of tasks and 
	// static taskCompleted() {
	// 	mongoose.connect(conString);

	// };


	// static Taskformatter() {

	// };

};

module.exports = TaskManager;