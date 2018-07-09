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
    farmfunding.find({}).sort({farm_id: -1}).limit(5).exec(function (err, farmfunding) {
        if (err)
            res.send(err);
        res.json(farmfunding);
    });
}

exports.add_funds = function (req, res) {
    var new_fund = new farmfunding(req.body);

    var lastFund = helpers.getLastID(farmfunding, "fund_id");
    lastFarm.then(function (result) {

        var currentID = "FND0000000";
        if (result != undefined) {
            currentID = result.fund_id;
        }
        new_fund.fund_id = helpers.getNewID(currentID);

        new_fund.save(function (err, new_fund) {
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

exports.get_funds = function (req, res) {
    farmfunding.findById(req.params.fund_id, function (err, funds) {
        if (err)
            res.send(err);
        res.json(funds);
    });
};

exports.update_funding = function (req, res) {
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

exports.delete_fund = function (req, res) {
    farmfunding.remove({
        fund_id: req.params.fund_id
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