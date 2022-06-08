const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const reportRoutes = require("./routes/reports");

const MONGODB_URI =
    process.env.MONGODB_URI ||
    "mongodb+srv://habeebullah:5Nuj1S4B4gg3RDAr@cluster0.jlzxi.mongodb.net/reportsDB";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// enabling cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

// using routes in app
app.use(reportRoutes);

// connecting to the database and starting the application
mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        console.log("Connected to MongoDB");
        app.listen(PORT);
    })
    .catch((err) => console.log(err));
