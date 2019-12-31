const app = require("express")();
const CronJob = require('cron').CronJob;
const bodyParser = require("body-parser");
const fs = require("fs");
const moment = require("moment");
const Gpio = require('pigpio').Gpio;

const GPIO_ACTIVE = new Gpio(2, { mode: Gpio.OUTPUT });
const GPIO_PASSIVE = new Gpio(3, { mode: Gpio.OUTPUT });

const CONFIG_FILE_LOCATION = 'HCSConfig&PlantData.json';
// check to see if we have turned on the light once, if we have we don't need to update the GPIO pins
let INITIAL_LIGHT_TURN_ON_STATE = false;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const checkLightCycleStatus = new CronJob("* */1 * * *", function() {
    const currentTime = getCurrentTime();

    const lightStatus = shouldLightBeOn(currentTime, readConfigFileField('timeToTurnSystemOn'), readConfigFileField('timeToTurnSystemOff'));

    if (lightStatus) {
        //Turn on RPI
        if(!INITIAL_LIGHT_TURN_ON_STATE) {
            turnSystemOn();
            INITIAL_LIGHT_TURN_ON_STATE = true;
        }
    }
    else {
        //Turn off RPI
        turnSystemOff();
    }

  });

  checkLightCycleStatus.start();

function getCurrentTime() {
    return moment();
}

function turnSystemOn() {
    GPIO_ACTIVE.digitalWrite(1);
    GPIO_PASSIVE.digitalWrite(0);
}

function turnSystemOff() {
    GPIO_ACTIVE.digitalWrite(0);
    GPIO_PASSIVE.digitalWrite(0);
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

app.get("/data", function(req, res) {
    let data = fs.readFileSync('HCSConfig&PlantData.json');
    let pd = JSON.parse(data);
    res.send(pd);
});

app.post("/update/pump/cycletime", function(req, res) {
    let data = fs.readFileSync('HCSConfig&PlantData.json');
    let pd = JSON.parse(data);
    pd['timeToTurnSystemOn'] = req.body.timeToTurnSystemOn;
    pd['timeToTurnSystemOff'] = req.body.timeToTurnSystemOff;

    fs.writeFile('HCSConfig&PlantData.json', JSON.stringify(pd), (err) => {
        if (err) throw err;
        console.log('Pump Cycle Time Updated');
    });
});

app.listen(5000, function() {
    console.log("started on port 5000");

});

