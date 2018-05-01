'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var farmsSchema = new Schema({
    farm_id: {
        type: String,
        Required: 'Kindly enter the farm_id'
    },
    farmer: {
        type: String,
        Required: 'Kindly enter the farm fullname'
    },
    email: {
        type: String,
        Required: 'Kindly enter the farmer email'
    },
    phoneno: {
        type: String,
        Required: 'Kindly enter the farmer phone number'
    },
    location: {
        type: String,
        Required: 'Kindly enter the location'
    },
    lga: {
        type: String,
        Required: 'Kindly enter the lga'
    },
    region: {
        type: String,
        Required: 'Kindly enter the region'
    },
    fundRequired: {
        type: Number,
        Default: 0.00
    },
    fundRaised: {
        type: Number,
        Default: 0.00
    },    
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['open', 'closed']
        }],
        default: ['open']
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('farms', farmsSchema);