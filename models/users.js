var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('./tasks');

var userSchema = new Schema({
	sirName: String,
	tasksCompleted: Number,
	totalTasks: Number,
	percentFinished: Number,
	currentTaskNumber: Number
});

var User = mongoose.model('user', userSchema);

module.exports = User;

// FOR STORING JUST USER IDs
// 	taskIDs: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
