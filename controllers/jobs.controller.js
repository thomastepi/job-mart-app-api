const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Job = require("../models/jobModel");

async function createJob(req, res) {
    const { position, company, location, jobType, status } = req.body;
    const newJob = new Job({ position, company, location, jobType, status });
    newJob
        .save()
        .then((job) => {
        res.status(201).send(job);
        })
        .catch((err) => {
        console.error("Error: ", err);
        res.status(500).send("Internal server error");
        });
    }

    module.exports = { createJob };