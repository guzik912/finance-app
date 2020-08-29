const mongoose = require('mongoose');
const { mongoURI } = require('./url');

const connectDB = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log(`MongoDB connected!`))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
