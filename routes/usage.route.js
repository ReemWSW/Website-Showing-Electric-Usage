const express = require('express');
const usageRoute = express.Router();

// Usage model
let usageController = require('../controllers/usage.controller');
let usageModel = require('../models/Usage');

usageRoute.route('/', usageController.render) // show Page index
// usageRoute.route('/api', usageController.getData)  // Get all data usage

usageRoute.route('/api').get((req, res, next) => {
  usageModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = usageRoute