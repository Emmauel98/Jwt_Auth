const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    First_name:{
        type: String,
        required: [true, "Please Provide a name"],
        trim: true,
    },
    Last_name:{
        type: String,
        required: [true, "Please Provide a name"],
        trim: true,
    },
    Email:{
        type: String,
        unique: true,
        required: [true, "Please Provide A valid email"],
    },
    Password:{
        type: String,
        required: [true, "Please Provide a password" ]
    },

})

module.exports = mongoose.model("Users",Users);