'use strict';
var mongoose = require('mongoose'),
    crypt = require('crypto'),
    User = mongoose.model('Users');
const secret = '#T0m4t03s&V3ggi3s';

var getHash = function (pwd) {
    const hash = crypt.createHmac('sha256', secret)
        .update(pwd)
        .digest('hex');
    return hash;
}


exports.get_users = function (req, res) {
    User.find({}, 'email phoneno firstname lastname role isActive', function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.get_user = function (req, res) {
    User.find({ email: req.params.email }, 'email phoneno firstname lastname role isActive', function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.add_new_user = function (req, res) {
    var new_user = new User(req.body);
    var pwd = getHash(new_user.pwd);
    new_user.pwd = pwd;

    var obj = helpers.saveData(new_user);
    obj.then(function (result) {
        return result;
    });

};

exports.authenticateViaEmail = function (req, res) {
    var password = getHash(req.params.pwd);
    User.find({ email: req.params.email, pwd: password }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.authenticateViaPhone = function (req, res) {
    var password = getHash(req.params.pwd);
    User.find({ phoneno: req.params.phoneno, pwd: password }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_user_prof = function (req, res) {
    User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_user = function (req, res) {
    User.findOneAndUpdate({ email: req.params.email, status: 'suspended', isActive: false }, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User deactivated successfully' });
    });
};

exports.removeUser = function (req, res) {
    User.remove({ email: req.params.email }, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully removed' });
    });
};