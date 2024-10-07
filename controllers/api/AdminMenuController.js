const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const Joi = require('joi');
const CustomError = require("../../errors/index")

const { AdminMenu } = require("../../schemas/adminSchema"); 

const fetchAdminMenu = async (req , res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const MenuData = await AdminMenu.find();

        blockResult = {
            'success':1,
            'message':"Data",
            'data': MenuData
        }
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
}
const addAdminMenu = async(req , res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { parent_id,menu_display,menu_url,order_by,status } = req.body;
        if (menu_display == '') {
            throw new CustomError.BadRequestError('Please enter menu_display');
        }
        if (menu_url == '') {
            throw new CustomError.BadRequestError('Please enter menu_url');
        }
        await AdminMenu.create({
            parent_id:parent_id,
            menu_display:menu_display,
            menu_url:menu_url,
            order_by:order_by,
            status:status
        });

        blockResult = {
            'success':1,
            'message':"Inserted",
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
const fetchOneAdminMenu = async (req , res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.query;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }

        const MenuData = await AdminMenu.findOne({ id });

        blockResult = {
            'success':1,
            'message':"Data",
            'data': MenuData
        }
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;   
}
const updateAdminMenu = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id,parent_id,menu_display,menu_url,order_by,status } = req.body;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        if (menu_display == '') {
            throw new CustomError.BadRequestError('Please enter menu_display');
        }
        if (menu_url == '') {
            throw new CustomError.BadRequestError('Please enter menu_url');
        }
        const updateData = {
            parent_id:parent_id,
            menu_display:menu_display,
            menu_url:menu_url,
            order_by:order_by,
            status:status
        };

        const updatedAdminMenu = await AdminMenu.findOneAndUpdate({ id }, updateData, {
            new: true,
            runValidators: true,
        });
        if(!updatedAdminMenu) {
            throw new CustomError.BadRequestError("Admin data not found.");
        }

        const adminMenuData = await AdminMenu.findOne({ id });
        if(!adminMenuData) {
            throw new CustomError.BadRequestError("Admin menu data not found.");
        }

        blockResult = {
            'success':1,
            'message':"Data",
            'data': adminMenuData
        } 
    
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;   
}

const deleteAdminMenu = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.body;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        const deletedAdmin = await AdminMenu.findOneAndDelete( { id }); 
        if(!deletedAdmin) {
            throw new CustomError.BadRequestError("Admin menu not found.");
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
    addAdminMenu,
    fetchAdminMenu,
    fetchOneAdminMenu,
    updateAdminMenu,
    deleteAdminMenu
}



