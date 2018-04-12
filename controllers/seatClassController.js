'use strict';
var mongoose = require('mongoose'),
seatClass = mongoose.model('seatClass');

exports.list_all_classes = function(req, res) {
    seatClass.find({}, function(err, seatClasses) {
        if (err)
            res.send(err);
        res.json(seatClasses);
    });
};

exports.create_class = function(req, res) {
    var new_seatClass = new seatClass(req.body);
    
    new_seatClass.save(function(err, new_class) {
        if (err) {
            res.send(err);
            res.json(new_class);
            console.log(new_class);
        }
    });
};

exports.get_class = function(req, res) {
    seatClass.findById(req.params.class_id, function(err, seatClass) {
        if (err)
            res.send(err);
        res.json(seatClass);
    });
};

exports.update_class = function(req, res) {
    seatClass.findOneAndUpdate({ class_id: req.params.class_id }, req.body, { new: true }, function(err, seatClass) {
        if (err)
            res.send(err);
        res.json(seatClass);
    });
};

exports.delete_class = function(req, res) {
    seatClass.remove({
        class_id: req.params.class_id
    }, function(err, rpt) {
        if (err)
            res.send(err);
        var message = 'class successfully deleted';
        seatClass.find({}, function(err, seatClasss) {
            if (err)
                res.send(err);
            res.json({ seatClasss, message });
        });
    });
};
