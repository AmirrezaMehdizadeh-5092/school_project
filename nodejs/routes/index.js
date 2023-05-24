// import packages
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const multer = require('multer');
const mkdir = require('mkdirp');

// import models
const u = require("../midd/upload");
const ImageModel = require('../model/image');
router.use(cors());

// sort image gallery 
router.get("/gallery", async (req, res) => {
    let gallery = await ImageModel.aggregate(
        [
            { $sort: { joinDate: -1 } }
        ]
    )
    res.send(gallery);
})

// create token for admin authentication
router.post("/create_token", (req, res) => {
    username = req.body.username;
    password = req.body.password;
    const token = jwt.sign({ username: username, password: password, iat: Math.floor(Date.now()) }, 'amirreza', {
        algorithm: "HS256",
    })
    res.send(token);
})

// uploads configuration
router.post('/upload', u.single('file'), async (req, res) => {
    image = req.file.filename;
    caption = req.body.caption;
    origin_name = req.file.originalname;
    NewImage = new ImageModel({
        image: image,
        original_name: origin_name,
        caption: caption
    })
    NewImage.save();
})

// check image not existing before
router.post("/check_image", async (req, res) => {
    name = req.body.name;
    find = await ImageModel.findOne({ original_name: name });
    if (find) {
        res.send("xx")
    }
    else if (!find) {
        res.send("aa")
    }
});

//  record student information in student model
router.post("/set_student" , async(req,res)=>{
    
})

router.use((err, req, res, next) => {
    if (err.code === "INCORRECT_FILETYPE") {
        res.status(422).json({ error: 'Only images are allowed' });
        return;
    }
    if (err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: 'Allow file size is 500KB' });
        return;
    }
});

module.exports = router;