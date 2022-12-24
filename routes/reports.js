const express = require("express");

const reportsController = require("../controllers/reports");

const router = express.Router();

// to post a particular commodity report
router.post("/reports", reportsController.postReport);

// to get a particular commodity report based on report id in query param
router.get("/report/:reportID", reportsController.getReport);

// to get all the reports
router.get("/reports", reportsController.getAllReports);

module.exports = router;
