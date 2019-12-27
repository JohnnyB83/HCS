// const RPI = require('./RPI/RaspberryPiFunctions');

// cron.schedule("* * * * *", function() {
//     console.log("running a task every minute");
//   });

const app = require("express")();
const CronJob = require('cron').CronJob;
const bodyParser = require("body-parser");
const fs = require("fs");
const moment = require("moment");
const RPI = require('./RPI/RaspberryPiFunctions');

const CONFIG_FILE_LOCATION = 'HCSConfig&PlantData.json';

app.use(bodyParser.urlencoded({extended: true}));

const checkLightCycleStatus = new CronJob("* */1 * * *", function() {
    const currentTime = getCurrentTime();

    const lightStatus = shouldLightBeOn(currentTime, readConfigFileField('timeToTurnSystemOn'), readConfigFileField('timeToTurnSystemOff'));

    if (lightStatus) {
        //Turn on RPI
    }
    else {
        //Turn off RPI
    }

  });

  checkLightCycleStatus.start();

function getCurrentTime() {
    return moment();
}

function shouldLightBeOn(currentTime, turnOnTime, turnOffTime) {
    if (turnOffTime < turnOnTime) {
        if (currentTime.isBetween(moment(turnOffTime,"HH:mm"), moment("24:00","HH:mm")) && currentTime.isSameOrAfter(moment(turnOnTime,"HH:mm"))) {
            return true;
        }

        if(currentTime.isBetween(moment("00:00","HH:mm"), moment(turnOffTime,"HH:mm"))) {
            return true;
        }
    }
    if (currentTime.isBetween(moment(turnOnTime,"HH:mm"), moment(turnOffTime,"HH:mm"))) {
        return true;
    }
    return false;
}

function readConfigFileField(field) {
    const data = fs.readFileSync(CONFIG_FILE_LOCATION);
    const pd = JSON.parse(data);

    if (pd[field] === undefined) {
        console.log('Error getting field: ' + field + ' from config file');
        return null;
    }
    return pd[field];
}

console.log(readConfigFileField('plantArray'))

app.get("/data", function(req, res) {
    let data = fs.readFileSync('HCSConfig&PlantData.json');
    let pd = JSON.parse(data);
    res.send(pd);
});

app.listen(5000, function() {
    console.log("started on port 5000");

});

