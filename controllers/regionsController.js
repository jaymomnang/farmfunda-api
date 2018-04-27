'use strict';
var mongoose = require('mongoose'),
regions = mongoose.model('regions');

exports.list_all_regions = function(req, res) {
    regions.find({}, function(err, regions) {
        if (err)
            res.send(err);
        res.json(regions);
    });
};

exports.add_new_region = function(req, res) {
    var new_region = new regions(req.body);
    
    new_region.save(function(err, new_region) {
        if (err) res.send(err);
        res.json(new_region);        
    });
};

exports.get_region = function(req, res) {
    regions.findById(req.params.region_id, function(err, region) {
        if (err)
            res.send(err);
        res.json(region);
    });
};

exports.update_region = function(req, res) {
    regions.findOneAndUpdate({ region_id: req.params.region_id }, req.body, { new: true }, function(err, port) {
        if (err)
            res.send(err);
        res.json(region);
    });
};

exports.delete_region = function(req, res) {
    regions.remove({
        region_id: req.params.region_id
    }, function(err, rpt) {
        if (err)
            res.send(err);
        var message = 'region successfully deleted';
        regions.find({}, function(err, regions) {
            if (err)
                res.send(err);
            res.json({ regions, message });
        });
    });
};


