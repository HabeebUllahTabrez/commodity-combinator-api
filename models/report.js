const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// model that defines the schema of the report document
const reportSchema = new Schema(
    {
        users: [
            {
                type: String,
                required: true,
            },
        ],
        marketID: {
            type: String,
            required: true,
        },
        marketName: {
            type: String,
            required: true,
        },
        cmdtyID: {
            type: String,
            required: true,
        },
        cmdtyName: {
            type: String,
            required: true,
        },
        // This is the average price per kg
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
