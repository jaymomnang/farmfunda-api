'use strict';
var mongoose = require('mongoose'),
farms = mongoose.model('farms');

exports.list_all_farms = function(req, res) {
    farms.find({}, function(err, farms) {
        if (err)
            res.send(err);
        res.json(farms);
    });
};

exports.add_new_farm = function(req, res) {
    var new_farm = new farms(req.body);
    
    new_farm.save(function(err, new_farm) {
        if (err) res.send(err);
        res.json(new_farm);        
    });
};

exports.get_farm = function(req, res) {
    farms.findById(req.params.farm_id, function(err, farm) {
        if (err)
            res.send(err);
        res.json(farm);
    });
};

exports.update_farm = function(req, res) {
    farms.findOneAndUpdate({ farm_id: req.params.farm_id }, req.body, { new: true }, function(err, port) {
        if (err)
            res.send(err);
        res.json(farm);
    });
};

exports.delete_farm = function(req, res) {
    farms.remove({
        farm_id: req.params.farm_id
    }, function(err, rpt) {
        if (err)
            res.send(err);
        var message = 'farm successfully deleted';
        farms.find({}, function(err, farms) {
            if (err)
                res.send(err);
            res.json({ farms, message });
        });
    });
};


