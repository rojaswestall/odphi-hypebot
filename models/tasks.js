var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tasksSchema = new Schema({
	task: String,
	dateDue: String
});

mongoose.model('tasks', tasksSchema);

// ,
// 	knight: {
// 		type: Schema.ObjectID,
// 		ref: 'users'
// 	}