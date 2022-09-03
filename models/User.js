const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, provide a name.'],
    minlength: 5,
    maxlength: 30,
  },

  email: {
    type: String,
    required: [true, 'Please, provide an email.'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Please, provide a password.'],
    minlength: 8,
  }
})

// Hash password
UserSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// Create JWT Token
UserSchema.methods.createToken = function(){
  const token = jwt.sign(
    {userId: this._id, name: this.name},
    process.env.JWT_SECRET, 
    {expiresIn: process.env.JWT_LIFETIME}
  )
  return token;
}

// Compare password
UserSchema.methods.comparePasswords = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

module.exports = mongoose.model('User', UserSchema);