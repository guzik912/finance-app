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
  personalData: {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    address: {
      country: String,
      city: String,
      street: String
    },
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
      credit: {
        type: Schema.Types.ObjectId,
        ref: 'Credit',
      },
      loan: Number,
      term: String,
      repayment: Number,
    },
  ],
  creditsHistory: [
    {
      credit: {
        type: Schema.Types.ObjectId,
        ref: 'Credit'
      },
      loan: Number,
      term: String,
      repayment: Number,
    }
  ],
  creditProposal: {
    creditId: {
      type: Schema.Types.ObjectId,
      ref: 'Credit',
    },
    loan: Number,
    term: String,
    status: String
  },
  wallet: {
    totalMoney: {
      type: Number,
      default: 0,
    }
  },
  mailbox: [
    {
      title: String,
      description: String,
      date: Date,
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
