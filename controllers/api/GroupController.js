const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const Joi = require('joi');
const CustomError = require("../../errors/index")

const { Groups } = require("../../schemas/adminSchema"); 

const fetchGroup = async (req, res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const GroupData = await Groups.find();
        
        blockResult = {
            'success':1,
            'message':"Data",
            'data': GroupData
        } 
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }
    outputResponse = res.json(blockResult);
    return outputResponse;
}

const addGroup = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { name,status,sequence,code } = req.body;

        if (name == '') {
            throw new CustomError.BadRequestError('Please enter name');
        }
        if (code == '') {
            throw new CustomError.BadRequestError('Please enter code');
        }
        if (sequence == '') {
            throw new CustomError.BadRequestError('Please enter sequence');
        }

        await Groups.create({
            name:name,
            code:code,
            sequence:sequence,
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

const fetchOneGroup = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.query;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }

        const groupData = await Groups.findOne({ id });
        if(!groupData) {
            throw new CustomError.BadRequestError("Admin data not found.");
        }
        blockResult = {
            'success':1,
            'message':"Data",
            'data': groupData
        } 
        
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
};

const updateGroup = async (req ,res) => {
    
    let blockResult = {};
    let outputResponse = {};

    try {

        const { id,name,status,sequence,code} = req.body;        
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        if (name == '') {
            throw new CustomError.BadRequestError('Please enter name');
        }
        if (code == '') {
            throw new CustomError.BadRequestError('Please enter code');
        }
        if (sequence == '') {
            throw new CustomError.BadRequestError('Please enter sequence');
        }
        const updateData = {
            name:name,
            code:code,
            sequence:sequence,
            status:status
        };
        const updatedGroup = await Groups.findOneAndUpdate({ id }, updateData, {
            new: true,
            runValidators: true,
        });
        if(!updatedGroup) {
            throw new CustomError.BadRequestError("Admin data not found.");
        }

        const groupData = await Groups.findOne({ id });
        if(!groupData) {
            throw new CustomError.BadRequestError("Admin data not found.");
        }

        blockResult = {
            'success':1,
            'message':"Data",
            'data': groupData
        } 

    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
}

const deleteGroup = async (req, res) => {

    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.body;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        const deletedGroup = await Groups.findOneAndDelete( { id }); 
        if(!deletedGroup) {
            throw new CustomError.BadRequestError("Admin not found.");
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
    addGroup,
    fetchGroup,
    fetchOneGroup,
    updateGroup,
    deleteGroup
};