const usageModel = require("../models/Usage")

exports.render = async (req, res, next) => {
    res.render("index", { title: "dashboard" })
}

exports.getData = async (req, res, next) => {
    usageModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}


