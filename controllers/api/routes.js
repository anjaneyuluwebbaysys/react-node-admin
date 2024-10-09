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
    deleteAdmin,
    AdminLogin
} = require("./AdminController");

const { 
    addAdminMenu,
    fetchAdminMenu,
    fetchOneAdminMenu,
    updateAdminMenu,
    deleteAdminMenu
} = require("./AdminMenuController");

const {
    addGroup,
    fetchGroup,
    fetchOneGroup,
    updateGroup,
    deleteGroup 
} = require("./GroupController");

const { 
    addCMS,
    fetchCMS,
    fetchOneCMS,
    updateCMS,
    deleteCMS
} = require("./CMSController");

const {
    addSetting,
    fetchSetting,
    fetchOneSetting,
    updateSetting,
    deleteSetting
} = require("./SettingController");

const { 
    addMedia,
    fetchMedia,
    fetchOneMedia,
    updateMedia,
    deleteMedia
} = require("./SocialMediaController");

const {
    addUser,
    fetchUser,
    fetchOneUser,
    updateUser,
    deleteUser
} = require("./UserController");

router.post('/addadmin',addAdmin);
router.get('/getadmin',fetchAdmin);
router.get('/admin',fetchOneAdmin);
router.post('/updateadmin',updateAdmin);
router.post('/deleteadmin',deleteAdmin);
router.post('/addmenu',addAdminMenu);
router.get("/getmenus",fetchAdminMenu);
router.get("/menu",fetchOneAdminMenu);
router.post("/updatemenu",updateAdminMenu);
router.post('/deletemenu',deleteAdminMenu);
router.post('/addgroup',addGroup);
router.get("/getgroups",fetchGroup);
router.get("/group",fetchOneGroup);
router.post("/updategroup",updateGroup);
router.post('/deletegroup',deleteGroup);
router.post('/addcms',addCMS);
router.get("/getcms",fetchCMS);
router.get("/cms",fetchOneCMS);
router.post("/updatecms",updateCMS);
router.post('/deletecms',deleteCMS);
router.post('/addsetting',addSetting);
router.get("/getsetting",fetchSetting);
router.get("/setting",fetchOneSetting);
router.post("/updatesetting",updateSetting);
router.post('/deletesetting',deleteSetting);
router.post('/addmedia',addMedia);
router.get("/getmedia",fetchMedia);
router.get("/media",fetchOneMedia);
router.post("/updatemedia",updateMedia);
router.post('/deletemedia',deleteMedia);
router.post('/adduser',addUser);
router.get("/getusers",fetchUser);
router.get("/user",fetchOneUser);
router.post("/updateuser",updateUser);
router.post('/deleteuser',deleteUser);

// API
router.post('/adminlogin',AdminLogin);

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