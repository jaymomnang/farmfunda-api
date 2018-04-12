'use strict';
var mongoose = require('mongoose'),
    //schema = mongoose.Schema,
    schedules = mongoose.model('schedules');

exports.list_all_schedules = function (req, res) {
    schedules.find({}, function (err, schedules) {
        if (err)
            res.send(err);
        res.json(schedules);
    });
};

exports.create_schedule = function (req, res) {
    var new_schedule = new schedules(req.body);
    new_schedule.departure_date = new_schedule.departure_date.setDate(new_schedule.departure_date.getDate() + 1); 

    schedules.findOne({}, 'schedule_id').sort({
        schedule_id: -1
    }).exec(function (error, data) {
        if (error) res.send(error)

        var last_scheduleId = 'SCH0000000';
        if (data != null) {
            last_scheduleId = data.schedule_id;
        }

        new_schedule.schedule_id = getNewID(last_scheduleId, "SCH");

        new_schedule.save(function (err, new_schedule) {
            if (err) res.send(err);

            schedules.find({}, function (err, schedules) {
                if (err)
                    res.send(err);
                res.json(schedules);
            });
        });
    });

};

exports.get_schedule = function (req, res) {
    schedules.findOne({'schedule_id' : req.params.schedule_id}, function (err, schedule) {
        if (err)
            res.send(err);
        res.json(schedule);
    });
};

exports.getMostRecent = function (req, res) {
    schedules.find({}).sort({ schedule_id: -1 }).limit(5).exec(function (err, schedule) {
        if (err)
            res.send(err);
        res.json(schedule);
    });
};

exports.getTrips = function (req, res) {
    var new_schedule = new schedules(req.body);
    new_schedule.departure_date = new_schedule.departure_date.setDate(new_schedule.departure_date.getDate() + 1);
    var d1, d2;
    var dt = new_schedule.departure_date.toString().substring(4, 24);

    d1 = new Date(dt);
    d2 = new Date(dt);
    d2.setDate(d2.getDate() - 1);
    
    schedules.find({ 'departure_date': { "$gte": d2, "$lt": d1 }, 'departure_port': new_schedule.departure_port, 'destination': new_schedule.destination, }, function (err, schedule) {
        if (err) return handleError(err);
        res.json(schedule);
    });
};

exports.getAvailableTrip = function (req, res) {
    schedules.find({}).sort({ departure_date: -1 }).limit(4).exec(function (err, schedule) {
        if (err)
            res.send(err);
        res.json(schedule);
    });

};

exports.update_schedule = function (req, res) {
    schedules.findOneAndUpdate({
        schedule_id: req.params.scheduleId
    }, req.body, {
            new: true
        }, function (err, schedule) {
            if (err)
                res.send(err);
            res.json(schedule);
        });
};

exports.delete_schedule = function (req, res) {
    schedules.remove({
        schedule_id: req.params.schedule_id
    }, function (err, prd) {
        if (err)
            res.send(err);
        var message = 'schedule successfully deleted';
        schedules.find({}, function (err, schedules) {
            if (err)
                res.send(err);
            res.json({
                schedules,
                message
            });
        });
    });   
};

