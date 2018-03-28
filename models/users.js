var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	sirName: String,
	tasksCompleted: Number,
	totalTasks: Number,
	percentFinished: Number,
	tasks: [{type:String}]
});

var User = mongoose.model('user', userSchema);

module.exports = User;