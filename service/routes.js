const express           = require("express");
var httpStatus          = require("http-status");
const router            = express.Router();

// const errorHandler      = require('_helpers/error-handler');
const apiRoutes         = require('../controllers/api/routes.js');

router.use('/api',apiRoutes);
router.use('*', (req, res) =>
    res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: 0,
        message: 'The route page you requested does not exist.',
        status: httpStatus.NOT_IMPLEMENTED,
        data: [],
    })
);

module.exports = router;

console.log('Executing serivces routes: routes.js ...');

