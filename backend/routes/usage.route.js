const express = require('express');
const usageRoute = express.Router();

// Usage model
let usageModel = require('../models/Usage');

// Get All usage
usageRoute.route('/').get((req, res) => {
  res.render('index')
})


// Get all data usage
usageRoute.route('/api').get(async (req, res) => {
  try {
    const result = await usageModel.find();
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

// Get single usage
usageRoute.route('/read/:id').get((req, res) => {
  usageModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = usageRoute;