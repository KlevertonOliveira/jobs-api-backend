const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please, provide a company name.'],
      minlength: 5,
      maxlength: 50,
    },

    position: {
      type: String,
      required: [true, 'Please, provide a position name.'],
      minlength: 5,
      maxlength: 50,
    },

    status: {
      type: String,
      enum: ['interview' | 'pending' | 'declined'],
      default: 'pending',
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please, provide a user'],
    }
  }, 
  {timestamps: true}
)

module.exports = mongoose.model('Job', JobSchema);