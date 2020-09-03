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
  financials: [
    {
      financial: {
        type: Schema.Types.ObjectId,
        ref: 'Financial',
      },
      investment: [
        {
          value: {
            type: Number,
            default: 0,
          },
          boughtWithCurrentValue: {
            type: Number,
            default: 0,
          },
          profit: {
            type: Number,
            default: 0,
          },
          waste: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  ],
  financialsHistory: [
    {
      financial: {
        type: Schema.Types.ObjectId,
        ref: 'Financial',
      },
      investment: [
        {
          value: {
            type: Number,
            default: 0,
          },
          boughtWithCurrentValue: {
            type: Number,
            default: 0,
          },
          profit: {
            type: Number,
            default: 0,
          },
          waste: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  ],
  credits: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Credit',
    },
  ],
  wallet: {
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
  },
});

module.exports = mongoose.model('User', userSchema);
