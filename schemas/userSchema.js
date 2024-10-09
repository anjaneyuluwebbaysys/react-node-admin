const _ = require('underscore');
const db = require('../config/mongodb.js');
const moment = require('moment');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: { 
        type: Schema.Types.ObjectId, 
        auto: true, 
        required: true 
    },
    name: { type: String, default: null },
    email: { type: String, default: null },
    mobile_code: { type: String, default: null },
    phone_number: { type: String, default: null },
    password: { type: String, default: null },
    gender: { type: String, default: null },
    dob: { type: Date, default: null },
    otp_code: { type: Number, default: null },
    push_notification: { type: String, enum: ['Yes', 'No'], default: 'No' },
    enabled_location: { type: String, enum: ['Yes', 'No'], default: 'No' },
    current_location: { type: String, default: null },
    latitude: { type: String, default: null },
    longitude: { type: String, default: null },
    profile_image: { type: String, default: null },
    device_token: { type: String, default: null },
    device_name: { type: String, default: null },
    device_os: { type: String, default: null },
    device_type: { type: String, default: null },
    app_version: { type: String, default: null },
    registration_date: { type: Date, default: null },
    modified_date: { type: Date, default: null },
    last_access_date: { type: Date, default: null },
    phone_verified: { type: String, enum: ['1', '0'], default: '0' },
    verification_code: { type: String, default: null },
    is_deleted: { type: String, enum: ['1', '0'], default: '0' },
    email_verified: { type: String, enum: ['Yes', 'No'], default: 'No' },
    referral_code: { type: String, default: null },
    referee_code: { type: String, default: null },
    firebase_token: { type: String, default: null },
    user_verified: { type: String, enum: ['Yes', 'No'], default: 'No' },
    status: { type: String, enum: ['active', 'inactive', 'pending', 'rejected'], default: 'active' }
});

// Create the model
const Users = mongoose.model('Users', UserSchema);

module.exports = {
    Users
};