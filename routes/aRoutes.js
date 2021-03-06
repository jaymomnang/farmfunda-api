'use strict';
module.exports = function (app) {
    var farms = require('../controllers/farmsController');
    var farmfunding = require('../controllers/farmfundingController');
    var regions = require('../controllers/regionsController');
    var users = require('../controllers/userController');


    // Farms Routes
    app.route('/topfarms')
        .get(farms.getTrending);

    app.route('/farms')
        .get(farms.list_all_farms)
        .post(farms.add_new_farm);

    app.route('/farmfunding')
        .get(farmfunding.list_all_farmfunding)
        .post(farmfunding.add_funds);

    app.route('/farms/:farm_id')
        .get(farms.get_farm)
        .put(farms.update_farm)
        .delete(farms.delete_farm);

    // Regions Routes
    app.route('/regions')
        .get(regions.list_all_regions)
        .post(regions.add_new_region);

    app.route('/regions/:region_id')
        .get(regions.get_region)
        .put(regions.update_region)
        .delete(regions.delete_region);

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