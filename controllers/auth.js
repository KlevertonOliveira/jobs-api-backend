const { BadRequestError, UnauthorizedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const register = async(req, res) => {
  const user = await User.create({...req.body});
  const token = user.createToken();

  res.status(StatusCodes.CREATED).json({
    user: { name: user.name }, 
    token
  });
}

const login = async(req, res) => {
  const { email, password } = req.body;

  // Email or Password not provided
  if(!email || !password){
    throw new BadRequestError('Please, provide email and password.')
  }

  const user = await User.findOne({email});

  // Invalid Credentials
  if(!user){
    throw new UnauthorizedError('Invalid Credentials'); 
  }
  
  const isPasswordcorrect = await user.comparePasswords(password); 
  if(!isPasswordcorrect){
    throw new UnauthorizedError('Invalid Credentials');
  }

  // Returning values
  const token = user.createToken();

  res.status(StatusCodes.OK).json({
    user: {name: user.name},
    token
  });
}

module.exports = {
  register, 
  login
}