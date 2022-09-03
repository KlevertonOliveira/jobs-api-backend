require('dotenv').config();
require('express-async-errors');

// Express
const express = require('express');
const app = express();

//mongoose
const mongoose = require('mongoose');

// errors middleware imports
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const authentication = require('./middleware/authentication');

// middleware
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authentication, jobsRouter);

app.use(errorHandler);
app.use(notFound);

// Connect to DB and app start - Setup
const port = process.env.PORT || 5000;

const start = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, ()=>{
      console.log(`Server is listening on port ${port}...`);
    })
  } 
  catch (error) {
    console.log(error);
  }
}

start();