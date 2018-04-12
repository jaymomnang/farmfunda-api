'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portsSchema = new Schema({
    port_id: {
        type: String,
        Required: 'Kindly enter the port_id'
    },
    port_name: {
        type: String,
        Required: 'Kindly enter name'
    },
    description: {
      type: String
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['active', 'inactive']
        }],
        default: ['active']
    }
});

module.exports = mongoose.model('ports', portsSchema);
