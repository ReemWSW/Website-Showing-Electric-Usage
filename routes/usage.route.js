const express = require('express');
const usageRoute = express.Router();

// Usage model
let usageController = require('../controllers/usage.controller');
let usageModel = require('../models/Usage');

usageRoute.route('/', usageController.render) // show Page index

//get all data in db
usageRoute.route('/api').get((req, res, next) => {
  usageModel.find({ limit: 1 }, (error, data) => {
    console.log(data);
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = usageRoute