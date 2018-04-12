'use strict';
var mongoose = require('mongoose'),
port = mongoose.model('ports');

exports.list_all_ports = function(req, res) {
    port.find({}, function(err, ports) {
        if (err)
            res.send(err);
        res.json(ports);
    });
};

exports.create_port = function(req, res) {
    var new_port = new port(req.body);
    
    new_port.save(function(err, new_port) {
        if (err) {
            res.send(err);
            res.json(new_port);
        }
    });
};

exports.get_port = function(req, res) {
    port.findById(req.params.port_id, function(err, port) {
        if (err)
            res.send(err);
        res.json(port);
    });
};

exports.update_port = function(req, res) {
    port.findOneAndUpdate({ port_id: req.params.port_id }, req.body, { new: true }, function(err, port) {
        if (err)
            res.send(err);
        res.json(port);
    });
};

exports.delete_port = function(req, res) {
    port.remove({
        port_id: req.params.port_id
    }, function(err, rpt) {
        if (err)
            res.send(err);
        var message = 'port successfully deleted';
        port.find({}, function(err, ports) {
            if (err)
                res.send(err);
            res.json({ ports, message });
        });
    });
};


