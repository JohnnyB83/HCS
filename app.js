// const RPI = require('./RPI/RaspberryPiFunctions');

// cron.schedule("* * * * *", function() {
//     console.log("running a task every minute");
//   });

const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.urlencoded({extended: true}));





app.get("/", function(req, res) {
    console.log("get");
    let data = fs.readFileSync('HCSConfig&PlantData.json');
    let pd = JSON.parse(data);
    res.send(pd);
});

app.listen(5000, function() {
    console.log("started on port 5000");

});

