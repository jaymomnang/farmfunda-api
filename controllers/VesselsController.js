'use strict';
var mongoose = require('mongoose'),
    Vessel = mongoose.model('Vessels');

exports.list_all_Vessels = function(req, res) {
    Vessel.find({}, function(err, Vessels) {
        if (err)
            res.send(err);
        res.json(Vessels);
    });
};

exports.create_Vessel = function(req, res) {
    var new_Vessel = new Vessel(req.body);
    console.log(new_Vessel);
    new_Vessel.save(function(err, new_Vessel) {
        if (err) {
            res.send(err);
            res.json(new_Vessel);
        }
    });
};

exports.get_Vessel = function(req, res) {
    Vessel.findById(req.params.Vessel_id, function(err, Vessel) {
        if (err)
            res.send(err);
        res.json(Vessel);
    });
};

exports.update_Vessel = function(req, res) {
    Vessel.findOneAndUpdate({ Vessel_id: req.params.Vessel_id }, req.body, { new: true }, function(err, Vessel) {
        if (err)
            res.send(err);
        res.json(Vessel);
    });
};

exports.delete_Vessel = function(req, res) {
    Vessel.remove({
        Vessel_id: req.params.Vessel_id
    }, function(err, rpt) {
        if (err)
            res.send(err);
        var message = 'Vessel successfully deleted';
        Vessel.find({}, function(err, Vessels) {
            if (err)
                res.send(err);
            res.json({ Vessels, message });
        });
    });
};
