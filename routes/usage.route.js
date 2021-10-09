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

// 2017-01-01T00:00:26.625Z
// get data with date weekly
//  https://[hostname]/api/timestamp?date=2019-12-12
usageRoute.route("/api/weekly/timestamp").get((req, res, next) => {
  var reqDate = req.query.date
  var dateCon = new Date(reqDate)
  var month = dateCon.getMonth() + 1
  var year = dateCon.getFullYear()
  usageModel.find({
    time_stamp: {
      $gt: new Date(`${year}-${month}-01T00:00:26.625Z`),
      $lte: new Date(`${year}-${month}-31T23:59:26.625Z`)
    }
  }, (error, data) => {
    if (error) {
      next(error)
    } else {
      res.status(201).json({
        data: {
          result: data,
          message: "Success",
        },
      });
    }
  })
});

// get data realtime 
//  https://[hostname]/api/realtime
usageRoute.route("/api/realtime").get((req, res, next) => {
  var today = new Date();
  var date = today.getFullYear() + '-' + prependZero((today.getMonth() + 1)) + '-' + prependZero(today.getDate());
  usageModel.find({
    time_stamp: {
      $gt: new Date(`${date}T00:00:00.625z`),
      $lte: new Date(`${date}T23:55:00.625z`)
    }
  }, (error, data) => {
    if (error) {
      next(error)
    } else {
      res.status(201).json({
        data: {
          result: data,
          message: "Success",
        },
      });
    }
  })
})

function prependZero(number) {
  if (number <= 9)
    return "0" + number;
  else
    return number;
}
module.exports = usageRoute