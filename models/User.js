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
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: Number,
      default: null,
    },
    address: {
      country: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        default: '',
      },
      street: {
        type: String,
        default: '',
      } 
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
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      totalProfit: {
        type: Number,
        default: 0,
      },
      totalWaste: {
        type: Number,
        default: 0,
      }
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
          date: {
            type: Date,
          },
          soldDate: {
            type: Date,
            default: Date.now,
          }
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
      startDate: {
        type: Date,
      }
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
      startDate: {
        type: Date,
      },
      finishDate: {
        type: Date,
      },
    }
  ],
  creditProposal: {
    creditId: {
      type: Schema.Types.ObjectId,
      ref: 'Credit',
    },
    loan: Number,
    term: String,
    status: String,
    startDate: {
      type: Date,
    }
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
