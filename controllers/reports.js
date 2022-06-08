const Report = require("../models/report");

// function to fetch and send all alphabets
exports.postReport = (req, res, next) => {
    const reportDetails = req.body.reportDetails;

    const {
        userID,
        marketID,
        marketName,
        marketType,
        cmdtyID,
        cmdtyName,
        priceUnit,
        convFctr,
        price,
    } = reportDetails;

    // console.log(
    //     userID,
    //     marketID,
    //     marketName,
    //     marketType,
    //     cmdtyID,
    //     cmdtyName,
    //     priceUnit,
    //     convFctr,
    //     price
    // );

    let pricePerKg = price / convFctr;

    Report.findOne({ marketID, cmdtyID })
        .then((report) => {
            // If a report doesnt exist
            if (!report) {
                const newReport = new Report({
                    users: [userID],
                    marketID,
                    marketName,
                    cmdtyID,
                    cmdtyName,
                    price: pricePerKg,
                });

                newReport
                    .save()
                    .then((report) => {
                        const responseBody = {
                            reportID: report._id,
                            status: "success",
                        };

                        res.setHeader("Content-Type", "application/json");
                        return res.send(JSON.stringify(responseBody));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                // If a report already exists

                // updating the price
                report.price = (pricePerKg + report.price) / 2;

                // pushing new user in the array
                report.users.push(userID);

                report
                    .save()
                    .then((report) => {
                        const responseBody = {
                            reportID: report._id,
                            status: "success",
                        };

                        res.setHeader("Content-Type", "application/json");
                        return res.send(JSON.stringify(responseBody));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

// function to fetch and send a single alphabet
exports.getReport = (req, res, next) => {
    const reportId = req.query.reportID;
    // console.log(reportId);

    Report.findById(reportId)
        .then((report) => {
            if (!report) {
                const responseBody = {
                    status: "Report not Found!",
                };

                res.setHeader("Content-Type", "application/json");
                return res.send(JSON.stringify(responseBody));
            }
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(report));
        })
        .catch((err) => console.log(err));
};