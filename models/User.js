const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
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
  accountConfirmStatus: {
    type: Boolean,
    default: false,
  },
  accountConfirmToken: String,
  resetToken: String,
  resetTokenExpiration: Date,
  date: {
    type: Date,
    default: Date.now,
  },
  financials: [{
    type: Schema.Types.ObjectId,
    ref: 'Financial',
  }],
  credits: [{
    type: Schema.Types.ObjectId,
    ref: 'Credit',
  }],
  wallet: {
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
  }
});


module.exports = mongoose.model('User', userSchema);