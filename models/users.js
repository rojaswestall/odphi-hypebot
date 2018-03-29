var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('./tasks');

var userSchema = new Schema({
	sirName: String,
	tasksCompleted: Number,
	totalTasks: Number,
	percentFinished: Number,
	currentTaskNumber: Number,
	taskIDs: [{ type: Schema.Types.ObjectId , ref: 'Task' }]
});

var User = mongoose.model('user', userSchema);

module.exports = User;