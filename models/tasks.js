var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./users');

var taskSchema = new Schema({
	taskNumber: Number,
	task: String,
	userID: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Task = mongoose.model('task', taskSchema);

module.exports = Task;