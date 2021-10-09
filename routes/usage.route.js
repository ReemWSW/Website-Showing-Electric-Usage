const express = require('express');
const usageRoute = express.Router();

// Usage model
let usageModel = require('../models/Usage');

// Get All usage
usageRoute.route('/').get((req, res) => {
  res.render('index')
})


// Get all data usage
usageRoute.route('/api').get((req, res) => {
  try {
    const result = usageModel.find();
    res.status(201).json({
      data: {
        result: result,
        message: "success",
      },
    });
  } catch (error) {
    next(error);
  }
})

module.exports = usageRoute;