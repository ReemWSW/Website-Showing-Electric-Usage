const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Usage = new Schema({
    time_stamp: {
        type: Date,
        required: true,
    },
    sensor_id: {
        type: Number,
        required: true,
    },
    electric_usage: {
        type: Number,
        required: true,
    }
}, {
    collection: 'usage'
})

module.exports = mongoose.model('Usage', Usage)