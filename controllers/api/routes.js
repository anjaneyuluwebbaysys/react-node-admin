const express           = require("express");
var httpStatus          = require("http-status");
const router            = express.Router();
const multer            = require("multer");
const path              = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/users/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
});

const uploadStorage = multer({ storage: storage });


router.post("/upload/profile", uploadStorage.single("file"), async (req, res) => {
    const {user_id} = req.body;
    let filename = req.file.filename;
    return res.json({
        'success':1,
        'message':"Update profile image.",
        'data': []
    });
});

router.post("/upload/user_kyc", uploadStorage.fields([
    {name: "driving_license_front", maxCount: 1 },
    {name: "driving_license_back", maxCount: 1 },
    {name: "id_proof_front", maxCount: 1 },
    {name: "id_proof_back", maxCount: 1 },
    {name: "self", maxCount: 1 }
]), async (req, res) => {
    const {user_id} = req.body;
    const {driving_license_front,driving_license_back,id_proof_front,id_proof_back,self} = req.files;
    let driving_license = driving_license_front[0].filename;
    let driving_license2 = driving_license_back[0].filename;
    let id_proof = id_proof_front[0].filename;
    let id_proof2 = id_proof_back[0].filename;
    let selfimg = self[0].filename;

     let insertKyc = {
        "user_id":user_id,
        "driving_license_front":driving_license,
        "driving_license_back":driving_license2,
        "id_proof_front":id_proof,
        "id_proof_back":id_proof2,
        "self":selfimg
    };

    return res.json({
        'success':1,
        'message':"Upload User KYC.",
        'data': []
    });
});


const { 
    addAdmin,
    fetchAdmin,
    fetchOneAdmin,
    updateAdmin,
    deleteAdmin
} = require("./AdminController");

router.post('/addadmin',addAdmin);
router.get('/getadmin',fetchAdmin);
router.get('/admin',fetchOneAdmin);
router.post('/updateadmin',updateAdmin);
router.post('/deleteadmin',deleteAdmin);

router.use('*', (req, res) =>
    res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: 0,
        message: 'API Root Path Missing.',
        status: httpStatus.NOT_IMPLEMENTED,
        data: [],
    })
);


module.exports = router;

console.log('Executing API routes: routes.js ...');