var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	sirName: String,
	tasksCompleted: Number,
	totalTasks: Number,
	percentFinished: Number
});

mongoose.model('users', usersSchema);