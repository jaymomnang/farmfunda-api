var express = require('express'),
    app = express(),
    port = process.env.PORT || 7000,
    mongoose = require('mongoose'),
    farms = require('./models/farmsModel'),
    regions = require('./models/regionsModel'),
    users = require('./models/usersModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
const testdb = 'mongodb://localhost:27017/farmfunda';
const livedb = 'mongodb://kilimo:eac-farming@cluster0-shard-00-00-lhu1r.mongodb.net:27017,cluster0-shard-00-01-lhu1r.mongodb.net:27017,cluster0-shard-00-02-lhu1r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(livedb);

global.helpers = require('./helpers/helpers');
console.log('loading kilimo server.........');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/aRoutes');
routes(app);

app.listen(port);
console.log('Kilimo server started on: ' + port);
