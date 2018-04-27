'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regionSchema = new Schema({
    region: {
        type: String,
        Required: 'Kindly enter the fullname of the region'
    },
    country: {
        type: String,
        Required: 'Kindly enter the country name'
    },
    districts: {
        name: {
            type: String
        },
        population: {
            type: Number
        }
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('regions', regionSchema);