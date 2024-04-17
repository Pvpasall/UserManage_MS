const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    email: String,
    password: String,
    age: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema)
