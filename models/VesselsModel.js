'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VesselSchema = new Schema({
    Vessel: {
        type: String,
        Required: 'Kindly enter the Vessel number'
    },
    vehicle_model: {
        type: String,
        Required: 'Kindly enter model of the vehicle'
    },
    description: {
      type: String
    },
    vehicle_reg_no: {
        type: String,
        Required: 'Kindly enter license number of the vehicle'
    },
    last_service_date: {
        type: Date,
        default: Date.now
    },
    Capacity: {
      type: Number
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['parked', 'on-trip', 'servicing']
        }],
        default: ['parked']
    }
});

module.exports = mongoose.model('Vessels', VesselSchema);
