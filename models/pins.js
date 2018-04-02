var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinSchema = new Schema({
	pinNumber: Number,
	content: String
});

var Pin = mongoose.model('pin', pinSchema);

module.exports = Pin;