// const RPI = require('./RPI/RaspberryPiFunctions');

// cron.schedule("* * * * *", function() {
//     console.log("running a task every minute");
//   });

const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");
const moment = require("moment");

app.use(bodyParser.urlencoded({extended: true}));

function getCurrentTime() {
    return moment(new Date()).format('HH:mm');
}

console.log(moment().format('HH:mm'));
console.log(moment().add('17', 'hours').format('HH:mm'));





app.get("/data", function(req, res) {
    let data = fs.readFileSync('HCSConfig&PlantData.json');
    let pd = JSON.parse(data);
    res.send(pd);
});

app.listen(5000, function() {
    console.log("started on port 5000");

});

