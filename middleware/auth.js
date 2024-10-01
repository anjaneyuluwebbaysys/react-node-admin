const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req,res,next) => {
    let token;
    let blockResult = {};
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }
    try {

        if (!token) {
            throw new CustomError.UnauthenticatedError('Authentication invalid');
        }

        const payload = isTokenValid(token);
      
        req.user = {
            userId: payload.userId,
            role: payload.role,
            phone:payload.phone
        };
        next();
    } catch (err) {
        blockResult.success = 0;
        blockResult.code = err.statusCode;
        blockResult.message = err.message;
        blockResult.data = [];
        res.status(401).send(blockResult);
    }
};

module.exports = {
    authenticateUser
};