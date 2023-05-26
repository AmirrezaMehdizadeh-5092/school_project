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
const u2 = require("../midd/student_image");
const ImageModel = require('../model/image');
const StudentModel = require("../model/student");
router.use(cors());

// sort image gallery and accept stuent
router.get("/gallery", async (req, res) => {
    let gallery = await ImageModel.aggregate(
        [
            { $sort: { joinDate: -1 } }
        ]
    )
    res.send(gallery);
})
router.get("/accept_student", async (req, res) => {
    let accept_student = await StudentModel.aggregate(
        [
            { $sort: { year: -1 } }
        ]
    )
    res.send(accept_student);
})

// filter accept studentes
router.post("/filter_accept_student", async (req, res) => {
    sel = req.body.sel;
    filter = await StudentModel.find({year : sel});
    res.send(filter);
});

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

// check user not recoreded before
router.post("/ckeck_image_student", async (req, res) => {
    name = req.body.name;
    code = req.body.code;
    find2 = await StudentModel.findOne({ code_meli: code });
    find1 = await StudentModel.findOne({ original_image_name: name });
    if (find1) {
        res.send("PF")
    }
    else if (find2)
    {
        res.send("CF")
    }
    else {
        res.send("aa")
    }
})

//  record student information in student model
router.post("/set_student", u2.single('file2'), async (req, res) => {
    fname = req.body.fname;
    lname = req.body.lname;
    code = req.body.code;
    reshte_diplom = req.body.reshte_diplom;
    university = req.body.university;
    reshte = req.body.reshte;
    year = req.body.year;
    filename = req.file.filename;
    originalname = req.file.originalname;
    NewStudent = new StudentModel({
        first_name: fname,
        last_name: lname,
        code_meli: code,
        reshte_diplom: reshte_diplom,
        university: university,
        reshte: reshte,
        year: year,
        image: filename,
        original_image_name: originalname
    })
    NewStudent.save();

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