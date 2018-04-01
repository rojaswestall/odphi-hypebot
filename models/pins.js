var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinSchema = new Schema({
	pinNumber: Number,
	content: String
});

var Task = mongoose.model('pin', pinSchema);

module.exports = Pin;