const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },  
   password: {
    type: String,
    required: true, 
    },
    role: {
        enum: ['user', 'admin'],
        type: String,
        default: 'user',
    },
    verified: {
        type: Boolean,
        default: false,
    }, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;