const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const Joi = require('joi');
const CustomError = require("../../errors/index")

const { AdminMenu } = require("../../schemas/adminSchema"); 
const cookieParser = require('cookie-parser');

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
}


module.exports = {
    addAdminMenu
};



