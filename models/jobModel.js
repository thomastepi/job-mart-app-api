const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        position: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        jobType: { type: String, required: true },
        status: { type: String, required: true },
    },
    {
        collection: "job-mart-jobs",
        timestamps: true,
    }
    );

const Job = mongoose.model("Job", schema);

module.exports = Job;