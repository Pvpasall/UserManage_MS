const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    age: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('profiles', profileSchema)
