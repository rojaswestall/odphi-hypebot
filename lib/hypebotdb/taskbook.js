'use strict';

// For connecting to mongodb with mongoose:
var mongoose = require('mongoose');

// Mongoose Models
var User = require('../../models/users');
var Task = require('../../models/tasks');

const conString = process.env.CONNECTION_STRING;

class TaskManager {

	constructor() {
		// this.tasksMessage = "";
	}

	// To add a new Knight to the TaskBook
	static newUser(sirname) {
		mongoose.connect(conString, { useNewUrlParser: true });

		User.findOne({sirName: sirname}, function (err, user) {
			if (err) {
				console.log("Error in newUser Query", err)
			}

			// To send messages
			const Bot = require('../bot');

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
	}


	// Deleting a Knight from the taskbook
	static deleteUser(sirname) {
		mongoose.connect(conString, { useNewUrlParser: true });

		User.findOne({sirName: sirname}, function (err, user) {
			if (err) {
				console.log("Error in deleteUser Query", err)
			}

			// To send messages
			const Bot = require('../bot');

			if (user) {

				Task.remove({ userID: user.id }, (err) => {
				    if (!err) {
				        console.log('We deleted all the tasks associated with the user that was deleted!');
				    }
				    else {
				        console.log('there was an error deleting the messages associated with the user that was deleted');
				    }
				});

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
		mongoose.connect(conString, { useNewUrlParser: true });

		User.findOne({sirName: sirname}, function (err, user) {
			if (err) {
				console.log("Error in adding newTask", err)
			}

			// To send messages
			const Bot = require('../bot');

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

				// update currentTaskNumber, totalTasks, and percentFinished
				user.percentFinished = (user.tasksCompleted / (user.totalTasks + 1)) * 100;
				user.currentTaskNumber = currentTask;
				user.totalTasks += 1;
				user.save(function (err) {
					if (err) {
				  	console.log("Error pushing the task to the list of tasks", err);
				  }
				});

				// Send message to the group notifying that the task has been added
				// Maybe send through something else
				Bot.sendMessage("Added task to the taskbook for Sir ".concat(sirname));

			}

			else {
				Bot.sendMessage("Sir ".concat(sirname).concat(" was not in the taskbook. To add a bro try \"New Knight - KNIGHT_NAME\""));
			}

		});
	}
	

	static showTasks () {
		mongoose.connect(conString, { useNewUrlParser: true });

		User.find((err, users) => {
			if (err) {
				console.log("Error in finding users for showTasks", err)
			}

			const Bot = require('../bot');

			if (users.length === 0) {
				var message = "There aren't any users 🤷🏾‍♂️";
			}
			else {
				var message = "";
				var counter = 0;
				users.forEach((item, index, array) => {
				  this.showTasksHelper(item, message, (usrmessage) => {
				    counter++;
				    message = message.concat(usrmessage);
				    if (counter === array.length && message === "") {
				    	message = "No one in the chapter has tasks 🙂";
						Bot.sendMessage(message);
				    }
				    else if(counter === array.length) {
				    	// Send message
						Bot.sendMessage(message);
				    }
				  });
				});
			}
		});
	}

	static showTasksHelper(user, message, callback) {
		mongoose.connect(conString, { useNewUrlParser: true });
		// IN THE FUTURE WE CAN SORT BY DATE, PROBABLY IN EPOCH TIME AND THEN CONVERT. STORE IN EPOCH TIME AND CONVERT
		if (user) {
			Task.find({ userID: user.id }, null, {sort: {taskNumber: 1}}, (err, tasks) => {
				if (tasks.length > 0) {
					message = message.concat("Sir ".concat(user.sirName).concat(" Tasks: \n"));
					for (var i = 0; i < tasks.length; i++) {
						message = message.concat("    ").concat(tasks[i].taskNumber).concat(" - ").concat(tasks[i].task).concat("\n");
					}
				}
				callback(message);
			});
		}
	}


	static showTasksFor(sirname) {
		mongoose.connect(conString, { useNewUrlParser: true });

		User.findOne({sirName: sirname}, (err, user) => {
			if (err) {
				console.log("Error in finding users for showTasksFor", err)
			}

			const Bot = require('../bot');

			// IN THE FUTURE WE CAN SORT BY DATE, PROBABLY IN EPOCH TIME AND THEN CONVERT. STORE IN EPOCH TIME AND CONVERT
			if (user) {
				var message = "Sir ".concat(user.sirName).concat(" Tasks: \n");
				Task.find({ userID: user.id }, null, {sort: {taskNumber: 1}}, (err, tasks) => {
					if (tasks) {
						for (var i = 0; i < tasks.length; i++) {
							message = message.concat("    ").concat(tasks[i].taskNumber).concat(" - ").concat(tasks[i].task).concat("\n");
						}
					}
					else {
						message = message.concat("    No tasks 🙂");
					}
					// Send message
					Bot.sendMessage(message);
				});
			}
			else {
				var message = "I couldn't find a Sir ".concat(sirname).concat(" 🤷🏾‍♂️");
			}
		});
	}

	static showStats() {
		mongoose.connect(conString, { useNewUrlParser: true });

		User.find((err, users) => {
			if (err) {
				console.log("Error showing stats", err)
			}

			// To send messages
			const Bot = require('../bot');

			// Construct message
			if (users.length == 0) {
				var message = "There aren't any users 🤷🏾‍♂️";
			}
			else {
				var message = 'Chapter Stats: \n\n';
				for (var i = 0; i < users.length; i++) {
					message = message.concat(users[i].sirName).concat(": \n");
					message = message.concat("    Tasks completed - ").concat(users[i].tasksCompleted).concat("\n");
					message = message.concat("    Total tasks - ").concat(users[i].totalTasks).concat("\n");
					// groupme doesn't handle % very well so I left it out. I get a bad status code 500. If it were to be inlcuded maybe try encoding to UTF8
					message = message.concat("    Percent of tasks finished - ").concat(users[i].percentFinished).concat("\n");
					message = message.concat("    Current # of tasks - ").concat(users[i].currentTaskNumber).concat("\n");
				}
			}
			
			// Send message
			Bot.sendMessage(message);
		})
	}

	static showStatsFor(sirname) {
		mongoose.connect(conString, { useNewUrlParser: true });

		User.findOne({sirName: sirname}, (err, user) => {
			if (err) {
				console.log("Error showing stats for one user", err)
			}

			// To send messages
			const Bot = require('../bot');

			// Construct Message
			if (user) {
				var message = "Sir ".concat(sirname).concat(" Stats: \n\n");
				message = message.concat("    Tasks completed - ").concat(user.tasksCompleted).concat("\n");
				message = message.concat("    Total tasks - ").concat(user.totalTasks).concat("\n");
				// groupme doesn't handle % very well so I left it out. I get a bad status code 500. If it were to be inlcuded maybe try encoding to UTF8
				message = message.concat("    Percent of tasks finished - ").concat(user.percentFinished).concat("\n");
				message = message.concat("    Current # of tasks - ").concat(user.currentTaskNumber).concat("\n");
			}
			else {
				var message = "I couldn't find a Sir ".concat(sirname).concat(" 🤷🏾‍♂️");
			}
			
			// Send message
			Bot.sendMessage(message);
		})
	}


	// Removing a task from a user
	static removeTask(sirname, taskNum) {
		mongoose.connect(conString, { useNewUrlParser: true });

		// Get the ID for the sirname and then check the tasks
		// Search in tasks collection for corresponding number and ID
		// If it exists, remove it and then change the number of tasks for the users (and everything else that should be changed)


		// Using es6 arrow functions to share class context into inner functions (to call other methods)
		User.findOne({sirName: sirname}, (err, user) => {
			if (err) {
				console.log("Error in removeTask Query", err)
			}

			// To send messages
			const Bot = require('../bot');

			// Removing Tasks from Tasks collection
			Task.findOne({taskNumber: taskNum, userID: user}, (err, task) => {
				if (err) {
				console.log("removeTask - Error in finding task in tasks collection", err)
				}

				if (task) {
					task.remove((err) => {
						if (err) {
					  		console.log("removeTask - Error in deleting task from tasks collection", err);
					  	}
					});
					console.log("Task #".concat(taskNum).concat(", ").concat(task.task).concat(", was removed for Sir ").concat(sirname));
					Bot.sendMessage("Removed task #".concat(taskNum).concat(" for Sir ").concat(sirname));
				}
				else {
					console.log("Couldn't remove specified task from task collection");
					Bot.sendMessage("Task #".concat(taskNum).concat(" for Sir ").concat(sirname).concat(" was not in the taskbook. I couldn't remove it. Here are the chapter tasks \n \n"));
					this.showTasks();
				}
			});

			var itemsProcessed = 0;
			var lastItem = false;
			var spliced = false;
			user.tasks.forEach((item, index, array) => {
				itemsProcessed += 1;
				if(!spliced && item.taskNumber.toString() === taskNum.toString()) {
					//Remove from array
					if (itemsProcessed === array.length) {
						lastItem = true;
					}

					user.tasks.splice(index, 1);
					spliced = true;

					// if it's not the last one, then the next task needs to have it's taskNumber changed
					if (user.tasks[index]) {
						var originalNum = user.tasks[index].taskNumber;
						user.tasks[index].taskNumber = taskNum;

						// Change it in the tasks collection
						Task.findOne({taskNumber: originalNum, userID: user}, (err, task) => {
							if (err) {
								console.log("removeTask - Error in chaging task in tasks collection", err)
							}
							task.taskNumber = taskNum;
							task.save(function (err) {
								if (err) {
							  	console.log("removeTask - error saving changed task in tasks collection", err);
							  }
							});
						});
					}
				}

				else if (spliced) {
					var originalNum = item.taskNumber;
					item.taskNumber = originalNum - 1;
					Task.findOne({taskNumber: originalNum, userID: user}, (err, task) => {
						if (err) {
							console.log("removeTask - Error in chaging task in tasks collection", err)
						}
						task.taskNumber = originalNum - 1;
						task.save(function (err) {
							if (err) {
						  	console.log("removeTask - error saving changed task in tasks collection", err);
						  }
						});
					});
				}

				// For case when removed last in the array
				if(lastItem && itemsProcessed === array.length + 1) {
					saveUser();
					// Show tasks for that one user this.showTasksFor(sirname);
				}
				else if (itemsProcessed === array.length) {
					saveUser();
					// Show tasks for that one user this.showTasksFor(sirname);
				}
			});

			function saveUser () {
				if (user.totalTasks - 1 !== 0) {
					user.percentFinished = (user.tasksCompleted / (user.totalTasks - 1)) * 100;
				}
				else {
					user.percentFinished = 0;
				}
				
				user.currentTaskNumber -= 1;
				user.totalTasks -= 1;

				user.save(function (err) {
					if (err) {
					  	console.log("Error chaging user tasks", err);
					}
				});
			}
		});
	}

	// Remove task from list of tasks and 
	static taskCompleted(sirname, taskNum) {
		mongoose.connect(conString, { useNewUrlParser: true });

		// Using es6 arrow functions to share class context into inner functions (to call other methods)
		User.findOne({sirName: sirname}, (err, user) => {
			if (err) {
				console.log("Error in removeTask Query", err)
			}

			// To send messages
			const Bot = require('../bot');

			// Removing Tasks from Tasks collection
			Task.findOne({taskNumber: taskNum, userID: user}, (err, task) => {
				if (err) {
				console.log("completedTask - Error in finding task in tasks collection", err)
				}

				if (task) {
					task.remove((err) => {
						if (err) {
					  		console.log("comletedTask - Error in deleting task from tasks collection", err);
					  	}
					});
					console.log(task.task.concat(" was completed by Sir ").concat(sirname));
					Bot.sendMessage("Task #".concat(taskNum).concat(" was completed by Sir ").concat(sirname));
				}
				else {
					console.log("Couldn't remove specified task from task collection");
					Bot.sendMessage("Task #".concat(taskNum).concat(" for Sir ").concat(sirname).concat(" was not in the taskbook. I couldn't mark it as complete. Here are the chapter tasks \n \n"));
					this.showTasks();
				}
			});

			var itemsProcessed = 0;
			var lastItem = false;
			var spliced = false;
			user.tasks.forEach((item, index, array) => {
				itemsProcessed += 1;
				if(!spliced && item.taskNumber.toString() === taskNum.toString()) {
					//Remove from array
					if (itemsProcessed === array.length) {
						lastItem = true;
					}

					user.tasks.splice(index, 1);
					spliced = true;

					// if it's not the last one, then the next task needs to have it's taskNumber changed
					if (user.tasks[index]) {
						var originalNum = user.tasks[index].taskNumber;
						user.tasks[index].taskNumber = taskNum;

						// Change it in the tasks collection
						Task.findOne({taskNumber: originalNum, userID: user}, (err, task) => {
							if (err) {
								console.log("completedTask - Error in chaging task in tasks collection", err)
							}
							task.taskNumber = taskNum;
							task.save(function (err) {
								if (err) {
							  	console.log("completedTask - error saving changed task in tasks collection", err);
							  }
							});
						});
					}
				}

				else if (spliced) {
					var originalNum = item.taskNumber;
					item.taskNumber = originalNum - 1;
					Task.findOne({taskNumber: originalNum, userID: user}, (err, task) => {
						if (err) {
							console.log("completedTask - Error in chaging task in tasks collection", err)
						}
						task.taskNumber = originalNum - 1;
						task.save(function (err) {
							if (err) {
						  	console.log("completedTask - error saving changed task in tasks collection", err);
						  }
						});
					});
				}

				// For case when removed last in the array
				if(lastItem && itemsProcessed === array.length + 1) {
					saveUser();
					// Show tasks for that one user this.showTasksFor(sirname);
				}
				else if (itemsProcessed === array.length) {
					saveUser();
					// Show tasks for that one user this.showTasksFor(sirname);
				}
			});

			function saveUser () {
				user.percentFinished = ((user.tasksCompleted + 1) / user.totalTasks) * 100;
				user.tasksCompleted += 1;
				user.currentTaskNumber -= 1;

				user.save(function (err) {
					if (err) {
					  	console.log("Error chaging user tasks", err);
					}
				});
			}
		});

	};

};

module.exports = TaskManager;