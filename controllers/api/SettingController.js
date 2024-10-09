const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const Joi = require('joi');
const CustomError = require("../../errors/index")

const { Settings } = require("../../schemas/adminSchema"); 

const fetchSetting = async (req, res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const settingData = await Settings.find();
        
        blockResult = {
            'success':1,
            'message':"Data",
            'data': settingData
        } 
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }
    outputResponse = res.json(blockResult);
    return outputResponse;
}

const addSetting = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { 
            site_name,
            logo,
            favicon,
            contact_number,
            office_number,
            phone_number,
            mobile_number,
            contact_email,
            support_email,
            address,
            location,
            google_maps,
            seo_title,
            seo_keywords,
            seo_description,
            copyrights
        } = req.body;

        if (site_name == '') {
            throw new CustomError.BadRequestError('Please enter site_name');
        }

        await Settings.create({
            site_name:site_name,
            logo:logo,
            favicon:favicon,
            contact_number:contact_number,
            office_number:office_number,
            phone_number:phone_number,
            mobile_number:mobile_number,
            contact_email:contact_email,
            support_email:support_email,
            address:address,
            location:location,
            google_maps:google_maps,
            seo_title:seo_title,
            seo_keywords:seo_keywords,
            seo_description:seo_description,
            copyrights:copyrights,
        });

        blockResult = {
            'success':1,
            'message':"Inserted",
            'token':'',
            'data': []
        }      

    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
};

const fetchOneSetting = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.query;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }

        const settingData = await Settings.findOne({ id });
        if(!settingData) {
            throw new CustomError.BadRequestError("Setting data not found.");
        }
        blockResult = {
            'success':1,
            'message':"Data",
            'data': settingData
        } 
        
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
};

const updateSetting = async (req ,res) => {
    
    let blockResult = {};
    let outputResponse = {};

    try {

        const { id,
            site_name,
            logo,
            favicon,
            contact_number,
            office_number,
            phone_number,
            mobile_number,
            contact_email,
            support_email,
            address,
            location,
            google_maps,
            seo_title,
            seo_keywords,
            seo_description,
            copyrights
        } = req.body;        
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        if (site_name == '') {
            throw new CustomError.BadRequestError('Please enter site_name');
        }
        const updateData = {
            site_name:site_name,
            logo:logo,
            favicon:favicon,
            contact_number:contact_number,
            office_number:office_number,
            phone_number:phone_number,
            mobile_number:mobile_number,
            contact_email:contact_email,
            support_email:support_email,
            address:address,
            location:location,
            google_maps:google_maps,
            seo_title:seo_title,
            seo_keywords:seo_keywords,
            seo_description:seo_description,
            copyrights:copyrights,
        };
        const updatedSetting = await Settings.findOneAndUpdate({ id }, updateData, {
            new: true,
            runValidators: true,
        });
        if(!updatedSetting) {
            throw new CustomError.BadRequestError("Setting data not found.");
        }

        const settingData = await Settings.findOne({ id });
        if(!settingData) {
            throw new CustomError.BadRequestError("Setting data not found.");
        }

        blockResult = {
            'success':1,
            'message':"Data",
            'data': settingData
        } 

    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
}

const deleteSetting = async (req, res) => {

    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.body;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        const deletedSetting = await Settings.findOneAndDelete( { id }); 
        if(!deletedSetting) {
            throw new CustomError.BadRequestError("Setting not found.");
        }
        blockResult = {
            'success':1,
            'message':"Data",
            'data': []
        } 

    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
}

module.exports = {
    addSetting,
    fetchSetting,
    fetchOneSetting,
    updateSetting,
    deleteSetting
};