const _ = require("underscore");
const db = require('../config/mongodb');
const moment = require('moment');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    id: { 
        type: Schema.Types.ObjectId, 
        auto: true, 
        required: true 
    },
    name: { type: String, default: null },
    username: { type: String, default: null },
    password: { type: String, default: null },
    email: { type: String, default: null },
    group_id: { type: String, default: null},
    image: { type: String, default: null },
    verification_code: { type: String, default: null },
    create_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const Admin = mongoose.model('Admin', AdminSchema);


const AdminMenuSchema = new Schema({
    id: { 
        type: Schema.Types.ObjectId, 
        auto: true, 
        required: true 
    },
    parent_id: { type: String, default: null },
    menu_display: { type: String, default: null },
    menu_url: { type: String, default: null },
    order_by: { type: String, default: null },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const AdminMenu = mongoose.model("AdminMenu",AdminMenuSchema);

const GroupSchema = new Schema({
    id: { 
        type: Schema.Types.ObjectId, 
        auto: true, 
        required: true 
    },
    name: { type: String, default: null },
    code: { type: String, default: null },
    sequence: { type: String, default: null },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const Groups = mongoose.model("Groups",GroupSchema);

module.exports = {
    Admin,
    AdminMenu,
    Groups
};