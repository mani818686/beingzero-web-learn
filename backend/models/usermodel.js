
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username : {type:String, unique: true, required: true},
    password: {type: String},
    email:String,
    age:Number
});

module.exports = mongoose.model('user', userSchema);