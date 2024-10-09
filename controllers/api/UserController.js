const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const moment = require('moment');
const CustomError = require("../../errors/index")
const { generateOTP , generateCode } = require("../../_helpers/index");
 
const { Users } = require("../../schemas/userSchema"); 

const fetchUser = async (req, res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const userData = await Users.find();
        
        blockResult = {
            'success':1,
            'message':"Data",
            'data': userData
        } 
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }
    outputResponse = res.json(blockResult);
    return outputResponse;
}

const addUser = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { 
            name,
            email,
            mobile_code,
            phone_number,
            password,
            gender,
            dob,
            profile_image
         } = req.body;
        if(name == '') {
            throw new CustomError.BadRequestError("Please enter name");
        }
        if(email == '') {
            throw new CustomError.BadRequestError("Please enter email");
        }
        if(mobile_code == '') {
            throw new CustomError.BadRequestError("Please enter mobile_code");
        }
        if(phone_number == '') {
            throw new CustomError.BadRequestError("Please enter phone_number");
        }
        if(password == '') {
            throw new CustomError.BadRequestError("Please enter password");
        }
        if(gender == '') {
            throw new CustomError.BadRequestError("Please enter gender");
        }
        if(dob == '') {
            throw new CustomError.BadRequestError("Please enter dob");
        }
        const OTPCode = generateOTP(6);
        const OTPCode8Len = generateOTP(8);
        const referralCode = generateCode(12);
        await Users.create({
            name:name,
            email:email,
            mobile_code:mobile_code,
            phone_number:phone_number,
            password:password,
            gender:gender,
            dob:dob,
            profile_image:profile_image,
            otp_code:OTPCode,
            registration_date: Date.now(),
            verification_code:OTPCode8Len,
            referral_code:referralCode,
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

const fetchOneUser = async (req ,res) => {
    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.query;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }

        const userData = await Users.findOne({ id });
        if(!userData) {
            throw new CustomError.BadRequestError("Soical Media data not found.");
        }
        blockResult = {
            'success':1,
            'message':"Data",
            'data': userData
        } 
        
    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
};

const updateUser = async (req ,res) => {
    
    let blockResult = {};
    let outputResponse = {};

    try {

        const { id,name,
            email,
            mobile_code,
            phone_number,
            password,
            gender,
            dob,
            profile_image } = req.body;        
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        if(name == '') {
            throw new CustomError.BadRequestError("Please enter name");
        }
        if(email == '') {
            throw new CustomError.BadRequestError("Please enter email");
        }
        if(mobile_code == '') {
            throw new CustomError.BadRequestError("Please enter mobile_code");
        }
        if(phone_number == '') {
            throw new CustomError.BadRequestError("Please enter phone_number");
        }
        if(password == '') {
            throw new CustomError.BadRequestError("Please enter password");
        }
        if(gender == '') {
            throw new CustomError.BadRequestError("Please enter gender");
        }
        if(dob == '') {
            throw new CustomError.BadRequestError("Please enter dob");
        }

        const updateData = {
            name:name,
            email:email,
            mobile_code:mobile_code,
            phone_number:phone_number,
            password:password,
            gender:gender,
            dob:dob,
            profile_image:profile_image,
            modified_date: Date.now(),
        };
        const updatedUser = await Users.findOneAndUpdate({ id }, updateData, {
            new: true,
            runValidators: true,
        });
        if(!updatedUser) {
            throw new CustomError.BadRequestError("User data not found.");
        }

        const userData = await Users.findOne({ id });
        if(!userData) {
            throw new CustomError.BadRequestError("User data not found.");
        }

        blockResult = {
            'success':1,
            'message':"Data",
            'data': userData
        } 

    } catch (err) {
        blockResult.success = 0;
        blockResult.message = err.message;
        blockResult.data = [];
    }

    outputResponse = res.json(blockResult);
    return outputResponse;
}

const deleteUser= async (req, res) => {

    let blockResult = {};
    let outputResponse = {};

    try {
        const { id } = req.body;
        if(id == '') {
            throw new CustomError.BadRequestError("Please enter id missing");
        }
        const deletedUser = await Users.findOneAndDelete( { id }); 
        if(!deletedUser) {
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
    addUser,
    fetchUser,
    fetchOneUser,
    updateUser,
    deleteUser
};