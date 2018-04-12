'use strict';
module.exports = function (app) {
    var Vessels = require('../controllers/VesselsController');
    var schedules = require('../controllers/schedulesController');
    var seatClass = require('../controllers/seatClassController');
    var ports = require('../controllers/portsController');
    var pricing = require('../controllers/pricingController');
    var users = require('../controllers/userController');

    // Vessels Routes
    app.route('/Vessel')
        .get(Vessels.list_all_Vessels)
        .post(Vessels.create_Vessel);

    app.route('/Vessel/:Vessel_id')
        .get(Vessels.get_Vessel)
        .put(Vessels.update_Vessel)
        .delete(Vessels.delete_Vessel);

    // Seat Classes Routes
    app.route('/class')
        .get(seatClass.list_all_classes)
        .post(seatClass.create_class);

    app.route('/class/:class_id')
        .get(seatClass.get_class)
        .put(seatClass.update_class)
        .delete(seatClass.delete_class);

    // Pricing Routes
    app.route('/price')
        .get(pricing.list_all_prices)
        .post(pricing.create_prices);

    app.route('/price/:price_id')
        .get(pricing.get_prices)
        .put(pricing.update_prices)
        .delete(pricing.delete_prices);

    // Ports Routes
    app.route('/ports')
        .get(ports.list_all_ports)
        .post(ports.create_port);

    app.route('/ports/:port_id')
        .get(ports.get_port)
        .put(ports.update_port)
        .delete(ports.delete_port);

    // schedules Routes
    app.route('/schedule')
        .get(schedules.getMostRecent)
        .post(schedules.create_schedule);

    app.route('/schedule/:getTrips/:single')
        .post(schedules.getTrips);

    app.route('/schedule/:schedule_id')
        .get(schedules.get_schedule)
        .put(schedules.update_schedule)
        .delete(schedules.delete_schedule);

    // users and login Routes
    app.route('/login/:email/:pwd')
        .get(users.authenticateViaEmail);

    app.route('/loginViaPhone/:phoneno/:pwd')
        .get(users.authenticateViaPhone);

    app.route('/users')
        .get(users.get_users)
        .post(users.add_new_user);

    app.route('/users/:email')
        .get(users.get_user)
        .put(users.update_user_prof)
        .delete(users.delete_user);
};
