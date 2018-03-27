var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	sirName: String
});

mongoose.model('users', usersSchema);