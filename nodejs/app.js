// add packages
const express = require('express');
const app = express();
const port = 1400;
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// database configuration
mongoose.connect("mongodb://localhost/school");
const db = mongoose.connection;
db.once("open", () => {
    console.log("database is connected");
})

// add routes
const index = require("./routes/index");

// requirements settings
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.json())
app.use(BodyParser.urlencoded([extended = true]));
app.use(express.static("public"));
app.use(cors())
app.set('trust proxy', 1)
app.use("/" , index)

// run server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});