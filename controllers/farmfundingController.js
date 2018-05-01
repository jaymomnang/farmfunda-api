'use strict';
var mongoose = require('mongoose'),
    farmfunding = mongoose.model('farmfunding');

exports.list_all_farmfunding = function (req, res) {
    farmfunding.find({}, function (err, farmfunding) {
        if (err)
            res.send(err);
        res.json(farmfunding);
    });
};

exports.getTrending = function(req, res){
    farmfunding.find({}).sort({fundRaised: -1}).limit(5).exec(function (err, farmfunding) {
        if (err)
            res.send(err);
        res.json(farmfunding);
    });
}

exports.add_new_farm = function (req, res) {
    var new_farm = new farmfunding(req.body);

    var lastFarm = helpers.getLastID(farmfunding, "farm_id");
    lastFarm.then(function (result) {

        var currentID = "FRM0000000";
        if (result != undefined) {
            currentID = result.farm_id;
        }
        new_farm.farm_id = helpers.getNewID(currentID);

        new_farm.save(function (err, new_farm) {
            if (err) res.send(err);
            farmfunding.find({}, function (err, farmfunding) {
                if (err) res.send(err);
                res.json(farmfunding);
            });
        });
    }, function(err) {
        console.log(err);
    });

};

exports.get_farm = function (req, res) {
    farmfunding.findById(req.params.farm_id, function (err, farm) {
        if (err)
            res.send(err);
        res.json(farm);
    });
};

exports.update_farm = function (req, res) {
    farmfunding.findOneAndUpdate({
        farm_id: req.params.farm_id
    }, req.body, {
        new: true
    }, function (err, port) {
        if (err)
            res.send(err);
        res.json(farm);
    });
};

exports.delete_farm = function (req, res) {
    farmfunding.remove({
        farm_id: req.params.farm_id
    }, function (err, rpt) {
        if (err)
            res.send(err);
        var message = 'farm successfully deleted';
        farmfunding.find({}, function (err, farmfunding) {
            if (err)
                res.send(err);
            res.json({
                farmfunding,
                message
            });
        });
    });
};