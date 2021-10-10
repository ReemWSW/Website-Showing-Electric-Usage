const express = require('express');
const usageRoute = express.Router();

// Usage model
let usageModel = require('../models/Usage');

usageRoute.route('/').get((req, res, next) => res.render("index")) // show Page index

//get one data in db
usageRoute.route('/api').get((req, res, next) => {
  usageModel.findOne((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// get data realtime 
// https://[hostname]/api/realtime?sensor=1
usageRoute.route("/api/realtime").get((req, res, next) => {
  var reqSensor = req.query.sensor; 

  var today = new Date(); // Date right now
  var date = today.getFullYear() + '-' + prependZero((today.getMonth() + 1)) + '-' + prependZero(today.getDate()); // 2021-10-10  


  usageModel.find({
    time_stamp: {
      $gt: new Date(`${date}T00:00:00.625z`), 
      $lte: new Date(`${date}T23:55:00.625z`) 
    }, sensor_id: reqSensor ? reqSensor : 1 
  }, (error, data) => {
    if (error) {
      next(error);
    } else {
      res.status(201)
        .json({ data });
    }
  })
})

// get data with date weekly
// https://[hostname]/api/weekly/timestamp?date=2019-12-12&sensor=1
usageRoute.route("/api/weekly/timestamp").get((req, res, next) => {
  var reqDate = req.query.date
  var reqSensor = req.query.sensor

  reqDate = reqDate ? new Date(reqDate) : new Date()
  var dateCon = reqDate
  var month = dateCon.getMonth() + 1
  var year = dateCon.getFullYear()

  usageModel.find({
    time_stamp: {
      $gt: new Date(`${year}-${month}-01T00:00:26.625Z`),
      $lte: new Date(`${year}-${month}-31T23:59:26.625Z`)
    }, sensor_id: reqSensor ? reqSensor : 1
  }, (error, data) => {
    if (error) {
      next(error)
    } else {
      res.status(201)
        .json({ data });
    }
  })
});

// get data with year 
//  https://[hostname]/api/month/timestamp?date=2019-12-12&sensor=1
usageRoute.route("/api/month/timestamp").get((req, res, next) => {
  var reqDate = req.query.date
  var reqSensor = req.query.sensor

  reqDate = reqDate ? new Date(reqDate) : new Date()
  var dateCon = reqDate
  var year = dateCon.getFullYear()

  usageModel.find({
    time_stamp: {
      $gt: new Date(`${year}-01-01T00:00:26.625Z`),
      $lte: new Date(`${year}-12-31T23:59:26.625Z`)
    }, sensor_id: reqSensor ? reqSensor : 1
  }, (error, data) => {
    if (error) {
      next(error)
    } else {
      res.status(201)
        .json({ data });
    }
  })
})

// number return 2 digit
function prependZero(number) {
  if (number <= 9)
    return "0" + number;
  else
    return number;
}

module.exports = usageRoute