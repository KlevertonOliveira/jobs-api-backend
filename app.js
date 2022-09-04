require('dotenv').config();
require('express-async-errors');

/* Express */
const express = require('express');
const app = express();

/* Imports */

// extra security packages 
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// mongoose
const mongoose = require('mongoose');

// errors middleware
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// auth middleware
const authentication = require('./middleware/authentication');

/* Middleware */
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssClean());

/* Routes */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authentication, jobsRouter);

app.use(errorHandler);
app.use(notFound);

/* Connect to DB and app start - Setup */
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