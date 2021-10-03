let fs = require('fs'),
    usageModel = require('./Usage');

exports.genData = () => {
    fs.readFile('new_storage.json', (err, data) => {
        // var data = new Set();
        var m = new Date().getMonth();
        usageModel.find((error, data) => {
            if (data.length == 0) {
                for (let month = 7; month < m - 1; month++) {
                    var lastDay = [2, 4, 6, 9, 11].includes(month) ? 30 : 31;
                    for (let day = 1; day <= lastDay; day++) {
                        var auDate = "2021-" + pad(month, 2) + "-" + pad(day, 2) + "T";

                        for (let hour = 0; hour < 24; hour++) {
                            for (let min = 0; min < 60; min += 15) {

                                var auTime = pad(hour, 2) + ":" + pad(min, 2) + ":57.575Z";
                                var obj = {
                                    time_stamp: auDate + auTime,
                                    sensor_id: 1,
                                    electric_usage: getRandomInt(20, 10)
                                }
                                // data.add(obj);
                                usageModel(obj)
                                    .save()
                                    .catch((err) => {
                                        console.log(err.message);
                                    });
                            }
                        }
                    }
                }
                console.log("Success")
            }
        })
    });

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}

