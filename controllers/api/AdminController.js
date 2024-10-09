const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const Joi = require('joi');
const CustomError = require("../../errors/index")
const bcrypt = require('bcrypt');

const { Admin } = require("../../schemas/adminSchema"); 

const fetchAdmin = async (req, res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const AdminData = await Admin.find();
        
        blockResult = {
            'success':1,
            'message':"Data",
            'data': AdminData
        } 
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }
    outputResponse = res.json(blockResult);
    return outputResponse;
}

const addAdmin = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { name,username,password,email,group_id,image,verification_code,status } = req.body;

        if (name == '') {
            throw new CustomError.BadRequestError('Please enter name');
        }
        if (username == '') {
            throw new CustomError.BadRequestError('Please enter username');
        }
        if (email == '') {
            throw new CustomError.BadRequestError('Please enter email');
        }
        if (password == '') {
            throw new CustomError.BadRequestError('Please enter password');
        }
        if (group_id == '') {
            throw new CustomError.BadRequestError('Please enter group_id');
        }
        await Admin.create({
            name:name,
            username:username,
            email:email,
            password:password,
            group_id:group_id,
            image:image,
            verification_code:verification_code,
            create_at:new Date(),
            updated_at: new Date(),
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

const fetchOneAdmin = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.query;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }

        const adminData = await Admin.findOne({ id });
        if(!adminData) {
            throw new CustomError.BadRequestError("Admin data not found.");
        }
        blockResult = {
            'success':1,
            'message':"Data",
            'data': adminData
        } 
        
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
};

const updateAdmin = async (req ,res) => {
    
    let blockResult = {};
    let outputResponse = {};

    try {

        const { id,name,username,email,password,group_id,status} = req.body;        
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        if (name == '') {
            throw new CustomError.BadRequestError('Please enter name');
        }
        if (username == '') {
            throw new CustomError.BadRequestError('Please enter username');
        }
        if (email == '') {
            throw new CustomError.BadRequestError('Please enter email');
        }
        if (group_id == '') {
            throw new CustomError.BadRequestError('Please enter group_id');
        }
        const updateData = {
            name:name,
            username:username,
            email:email,
            password:password,
            group_id:group_id,
            updated_at: new Date(),
            status:status
        };
        const updatedAdmin = await Admin.findOneAndUpdate({ id }, updateData, {
            new: true,
            runValidators: true,
        });
        if(!updatedAdmin) {
            throw new CustomError.BadRequestError("Admin data not found.");
        }

        const adminData = await Admin.findOne({ id });
        if(!adminData) {
            throw new CustomError.BadRequestError("Admin data not found.");
        }

        blockResult = {
            'success':1,
            'message':"Data",
            'data': adminData
        } 

    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
}

const deleteAdmin = async (req, res) => {

    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.body;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        const deletedAdmin = await Admin.findOneAndDelete( { id }); 
        if(!deletedAdmin) {
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
const AdminLogin = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { username,password } = req.body;
        if(username == '') {
            throw new CustomError.BadRequestError("Please enter username");
        }
        if(password == '') {
            throw new CustomError.BadRequestError("Please enter password");
        }
        const adminData = await Admin.find({ username:username,password:password });
        if(_.isEmpty(adminData)) {
            throw new CustomError.BadRequestError("Please enter vaild username and password");
        }
        const saltRounds = 10;
        const plainPassword = adminData.name+'::'+adminData.id+'::'+adminData.password;
        const hashedToken = await bcrypt.hash(plainPassword, saltRounds);

        blockResult = {
            'success':1,
            'token':hashedToken,
            'message':"Data",
            'data': adminData
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
    addAdmin,
    fetchAdmin,
    fetchOneAdmin,
    updateAdmin,
    deleteAdmin,
    AdminLogin
};