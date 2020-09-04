const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  advantages: [
    {
      type: String,
      required: true,
    }
  ],
  requirements: [
      {
        type: String,
        required: true,
      }
  ],
  loans: [
    {
      type: Number,
      required: true,
    }
  ],
  terms: [
    {
      type: String,
      required: true,
    }
  ],
  precentage: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Credit', creditSchema); 