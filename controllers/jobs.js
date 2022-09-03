const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');

const getAllJobs = async(req, res) => {
  res.status(StatusCodes.OK).json({message: 'Get All Jobs'});
}

const createJob = async(req, res) => {
  res.status(StatusCodes.OK).json({message: 'Create Job'});
}

const getJob = async(req, res) => {
  res.status(StatusCodes.OK).json({message: 'Get Job'});
}

const updateJob = async(req, res) => {
  res.status(StatusCodes.OK).json({message: 'Update Job'});
}

const deleteJob = async(req, res) => {
  res.status(StatusCodes.OK).json({message: 'Delete Job'});
}

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
}