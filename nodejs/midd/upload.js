// import packages
const multer = require('multer');
const mkdir = require('mkdirp');
const fs = require('fs');

// set directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./uploads/gallery`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null , Date.now() + '_' + file.originalname);
    }
})

// save file in selected directory
const upload = multer({ storage: storage });

module.exports = upload;
