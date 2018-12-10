var mongoose = require('mongoose')

var UsersSchema = new mongoose.Schema({
    name: String,
    pass: String,
    nickName: String
},
{ collection: 'users' });

module.exports = mongoose.model('Users', UsersSchema);
