const mongoose = require('mongoose');


const LoginUser = new mongoose.Schema({
    Email:{
        type: String,
        unique: true,
        required: [true, "Please Provide A valid email"],
    },
    Password:{
        type: String,
        required: [true, "Please Provide a password" ]
    },
});

module.exports = mongoose.model('LoginUser',LoginUser);