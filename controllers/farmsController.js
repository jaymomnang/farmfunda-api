'use strict';
var mongoose = require('mongoose'),
    farms = mongoose.model('farms');

exports.list_all_farms = function (req, res) {
    farms.find({}, function (err, farms) {
        if (err)
            res.send(err);
        res.json(farms);
    });
};

exports.add_new_farm = function (req, res) {
    var new_farm = new farms(req.body);

    var lastFarm = helpers.getLastID(farms, "farm_id");
    lastFarm.then(function (result) {

        var currentID = "FRM0000000";
        if (result != undefined) {
            currentID = result.farm_id;
        }
        new_farm.farm_id = helpers.getNewID(currentID);

        new_farm.save(function (err, new_farm) {
            if (err) res.send(err);
            farms.find({}, function (err, farms) {
                if (err) res.send(err);
                res.json(farms);
            });
        });
    }, function(err) {
        console.log(err);
    });

};

exports.get_farm = function (req, res) {
    farms.findById(req.params.farm_id, function (err, farm) {
        if (err)
            res.send(err);
        res.json(farm);
    });
};

exports.update_farm = function (req, res) {
    farms.findOneAndUpdate({
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
    farms.remove({
        farm_id: req.params.farm_id
    }, function (err, rpt) {
        if (err)
            res.send(err);
        var message = 'farm successfully deleted';
        farms.find({}, function (err, farms) {
            if (err)
                res.send(err);
            res.json({
                farms,
                message
            });
        });
    });
};