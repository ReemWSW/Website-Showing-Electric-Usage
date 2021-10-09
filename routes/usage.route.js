const express = require('express');
const usageRoute = express.Router();

// Usage model
let usageController = require('../controllers/usage.controller');
let usageModel = require('../models/Usage');

usageRoute.route('/', usageController.render) // show Page index

//get all data in db
usageRoute.route('/api').get((req, res, next) => {
  usageModel.findOne((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// 2017-01-01T01:15:26.625Z

// get data with date weekly
//  https://[hostname]/api/timestamp?date=2019-12-12
usageRoute.route("/api/weekly/timestamp").get(function (req, res, next) {
  var reqDate = req.query.date
  usageModel.find({
    time_stamp: {
      $gt: new Date(`${reqDate}T00:00:00.625z`),
      $lte: new Date(`${reqDate}T23:55:00.625z`)
    }
  }, (error, data) => {
    if (error) {
      next(error)
    } else {
      res.json(data)
    }
  })
});

module.exports = usageRoute