const mongoose = require('mongoose');

const mongoURI =
  'mongodb+srv://guzik:guzik1234@finance.uuxff.mongodb.net/finance?retryWrites=true&w=majority';

const connectDB = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB connected!`))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
