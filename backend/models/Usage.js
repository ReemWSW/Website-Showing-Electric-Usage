const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Usage = new Schema({
    time_stamp: {
        type: Date,
    },
    sensor_id: {
        type: Number,
    },
    electric_usage: {
        type: Number
    }
}, {
    collection: 'usage'
})

module.exports = mongoose.model('Usage', Usage)