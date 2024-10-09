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

const CmsSchema = new Schema({
    id: { 
        type: Schema.Types.ObjectId, 
        auto: true, 
        required: true 
    },
    name: { type: String, default: null },
    page_slug: { type: String, default: null },
    description: { type: String, default: null },
    url: { type: String, default: null },
    meta_keywords: { type: String, default: null },
    meta_description: { type: String, default: null },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const Cms = mongoose.model("Cms",CmsSchema);

const settingSchema = new mongoose.Schema({
    id: { 
        type: Schema.Types.ObjectId, 
        auto: true, 
        required: true 
    },
    site_name: { type: String, default: null },
    logo: { type: String, default: null },
    favicon: { type: String, default: null },
    contact_number: { type: String, default: null },
    office_number: { type: String, default: null },
    phone_number: { type: String, default: null },
    mobile_number: { type: String, default: null },
    contact_email: { type: String, default: null },
    support_email: { type: String, default: null },
    address: { type: String, default: null },
    location: { type: String, default: null },
    google_maps: { type: String, default: null },
    seo_title: { type: String, default: null },
    seo_keywords: { type: String, default: null },
    seo_description: { type: String, default: null },
    copyrights: { type: String, default: null },
    sms_enabled_mode: { type: String, enum: ['sandbox', 'live'], default: null },
    sms_api_key: { type: String, default: null },
    sms_api_channel_id: { type: String, default: null },
    smtp_email_enabled: { type: String, default: null },
    google_map_api_key: { type: String, default: null },
    android_version: { type: String, default: null },
    android_play_store_url: { type: String, default: null },
    ios_app_store_url: { type: String, default: null },
    ios_version: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Settings = mongoose.model('Settings', settingSchema);

const socialMediaSchema = new mongoose.Schema({
    id: { 
        type: Schema.Types.ObjectId, 
        auto: true, 
        required: true 
    },
    facebook: { type: String, default: null },
    twitter: { type: String, default: null },
    google: { type: String, default: null },
    youtube: { type: String, default: null },
    linkedin: { type: String, default: null },
    instagram: { type: String, default: null },
    pinterest: { type: String, default: null }
});

const SocialMedia = mongoose.model("SocialMedia",socialMediaSchema); 

module.exports = {
    Admin,
    AdminMenu,
    Groups,
    Cms,
    Settings,
    SocialMedia
};