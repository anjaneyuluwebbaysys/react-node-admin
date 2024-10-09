const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const Joi = require('joi');
const CustomError = require("../../errors/index")

const { SocialMedia } = require("../../schemas/adminSchema"); 

const fetchMedia = async (req, res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const mediaData = await SocialMedia.find();
        
        blockResult = {
            'success':1,
            'message':"Data",
            'data': mediaData
        } 
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }
    outputResponse = res.json(blockResult);
    return outputResponse;
}

const addMedia = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { facebook,twitter,google,youtube,linkedin,instagram,pinterest } = req.body;

        await SocialMedia.create({
            facebook:facebook,
            twitter:twitter,
            google:google,
            youtube:youtube,
            linkedin:linkedin,
            instagram:instagram,
            pinterest:pinterest
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

const fetchOneMedia = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.query;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }

        const mediaData = await SocialMedia.findOne({ id });
        if(!mediaData) {
            throw new CustomError.BadRequestError("Soical Media data not found.");
        }
        blockResult = {
            'success':1,
            'message':"Data",
            'data': mediaData
        } 
        
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
};

const updateMedia = async (req ,res) => {
    
    let blockResult = {};
    let outputResponse = {};

    try {

        const { id,facebook,twitter,google,youtube,linkedin,instagram,pinterest } = req.body;        
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        
        const updateData = {
            facebook:facebook,
            twitter:twitter,
            google:google,
            youtube:youtube,
            linkedin:linkedin,
            instagram:instagram,
            pinterest:pinterest
        };
        const updatedMedia = await SocialMedia.findOneAndUpdate({ id }, updateData, {
            new: true,
            runValidators: true,
        });
        if(!updatedMedia) {
            throw new CustomError.BadRequestError("Media data not found.");
        }

        const mediaData = await SocialMedia.findOne({ id });
        if(!mediaData) {
            throw new CustomError.BadRequestError("Media data not found.");
        }

        blockResult = {
            'success':1,
            'message':"Data",
            'data': mediaData
        } 

    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
}

const deleteMedia = async (req, res) => {

    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.body;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        const deletedMedia = await SocialMedia.findOneAndDelete( { id }); 
        if(!deletedMedia) {
            throw new CustomError.BadRequestError("Media not found.");
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
    addMedia,
    fetchMedia,
    fetchOneMedia,
    updateMedia,
    deleteMedia
};