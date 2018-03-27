var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskssSchema = new Schema({
	task: String,
	dateDue: String,
	knight: {
		type: Schema.ObjectID,
		ref: "users"
	}
});

mongoose.model('tasks', usersSchema);