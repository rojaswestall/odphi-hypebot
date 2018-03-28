var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	taskNumber: Number,
	task: String
});

var Task = mongoose.model('task', taskSchema);

module.exports = Task;