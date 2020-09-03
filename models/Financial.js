const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: '$',
  },
  lastChangedValue: {
    type: Number,
    default: 0,
  },
  lastOperationType: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Financial', financialSchema);