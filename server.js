var express = require('express'),
    app = express(),
    port = process.env.PORT || 7000,
    mongoose = require('mongoose'),
    Vessels = require('./models/VesselsModel'),
    schedules = require('./models/schedulesModel'),
    seatClass = require('./models/seatClassModel'),
    ports = require('./models/portsModel'),
    pricing = require('./models/pricingModel'),
    users = require('./models/usersModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
const testdb = 'mongodb://localhost:27017/farmfunda';
const livedb = 'mongodb://kilimo:eac-farming@cluster0-shard-00-00-lhu1r.mongodb.net:27017,cluster0-shard-00-01-lhu1r.mongodb.net:27017,cluster0-shard-00-02-lhu1r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(livedb);

//internally generated numbers for attendance records.
global.getNewID = function (currentID, prefix) {
    var pos = Number(currentID.substring(3, 10)) + 1;
    var l = pos.toString().length;
    var nxt = prefix;

    for (var i = 0; i + l < 7; i++) {
        nxt = nxt + "0";
    }

    return nxt + pos.toString();
};

console.log('loading farmfunda server.........');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/aRoutes');
routes(app);

app.listen(port);
console.log('farmfunda server started on: ' + port);
