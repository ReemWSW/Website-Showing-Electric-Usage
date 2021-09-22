const express = require('express');
const app = express();
const usageRoute = express.Router();

// Employee model
let Usage = require('../models/Usage');

// Get All Employees
usageRoute.route('/').get((req, res) => {
  Usage.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
usageRoute.route('/read/:id').get((req, res) => {
  Usage.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = usageRoute;