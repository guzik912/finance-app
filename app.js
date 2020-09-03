const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const financialRoutes = require('./routes/financial');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Controll-Allow-Origin', '*');
  res.setHeader('Access-Controll-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Controll-Allow-Headers', 'Content-Type', 'Authorization');
  next();
})

app.use('/api/auth', authRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});