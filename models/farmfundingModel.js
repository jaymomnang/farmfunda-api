'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var farmfundingSchema = new Schema({
    farm_id: {
        type: String,
        Required: 'Kindly enter the farm_id'
    },
    farmer: {
        type: String,
        Required: 'Kindly enter the farmer fullname'
    },
    email: {
        type: String,
        Required: 'Kindly enter the farmer email'
    },
    amount: {
        type: Number
    },
    funder: {
        type: String
    },
    funder_email: {
        type: String
    },
    transaction_date: {
        type: Date,
        default: Date.now
    },
    date_accepted: {
        type: Date
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('farmfunding', farmfundingSchema);