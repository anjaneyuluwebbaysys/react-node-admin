const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const Joi = require('joi');
const CustomError = require("../../errors/index")

const { Cms } = require("../../schemas/adminSchema"); 

const fetchCMS = async (req, res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const CmsData = await Cms.find();
        
        blockResult = {
            'success':1,
            'message':"Data",
            'data': CmsData
        } 
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }
    outputResponse = res.json(blockResult);
    return outputResponse;
}

const addCMS = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { name,description,url,meta_keywords,meta_description,status } = req.body;

        if (name == '') {
            throw new CustomError.BadRequestError('Please enter name');
        }
        if (description == '') {
            throw new CustomError.BadRequestError('Please enter description');
        }
        if (status == '') {
            throw new CustomError.BadRequestError('Please enter status');
        }

        await Cms.create({
            name:name,
            description:description,
            url:url,
            meta_keywords:meta_keywords,
            meta_description:meta_description,
            status:status
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

const fetchOneCMS = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.query;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }

        const CMSData = await Cms.findOne({ id });
        if(!CMSData) {
            throw new CustomError.BadRequestError("CMS data not found.");
        }
        blockResult = {
            'success':1,
            'message':"Data",
            'data': CMSData
        } 
        
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
};

const updateCMS = async (req ,res) => {
    
    let blockResult = {};
    let outputResponse = {};

    try {

        const { id,name,description,url,meta_keywords,meta_description,status} = req.body;        
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        if (name == '') {
            throw new CustomError.BadRequestError('Please enter name');
        }
        if (description == '') {
            throw new CustomError.BadRequestError('Please enter description');
        }
        if (status == '') {
            throw new CustomError.BadRequestError('Please enter status');
        }
        const updateData = {
            name:name,
            description:description,
            url:url,
            meta_keywords:meta_keywords,
            meta_description:meta_description,
            status:status
        };
        const updatedCMS = await Cms.findOneAndUpdate({ id }, updateData, {
            new: true,
            runValidators: true,
        });
        if(!updatedCMS) {
            throw new CustomError.BadRequestError("CMS data not found.");
        }

        const CMSData = await Cms.findOne({ id });
        if(!CMSData) {
            throw new CustomError.BadRequestError("CMS data not found.");
        }

        blockResult = {
            'success':1,
            'message':"Data",
            'data': CMSData
        } 

    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
}

const deleteCMS = async (req, res) => {

    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.body;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        const deletedCMS = await Cms.findOneAndDelete( { id }); 
        if(!deletedCMS) {
            throw new CustomError.BadRequestError("CMS not found.");
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
    addCMS,
    fetchCMS,
    fetchOneCMS,
    updateCMS,
    deleteCMS
};