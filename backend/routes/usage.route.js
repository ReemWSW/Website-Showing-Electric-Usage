const express = require('express');
const app = express();
const usageRoute = express.Router();

// Usage model
let Usage = require('../models/Usage');

// Get All usage
usageRoute.route('/').get((req, res) => {
  Usage.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single usage
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