const express = require("express");
const router = express.Router();
const { createJob, getJobs, deleteJob, updateJob, getJobStats } = require("../controllers/jobs.controller");
const authenticateToken = require('../middleware/authtoken');

router.post("/create", authenticateToken, createJob);
router.get("/getJob", authenticateToken, getJobs);
router.delete("/delete/:id", authenticateToken, deleteJob);
router.patch("/update/:id", authenticateToken,  updateJob);
router.get("/stats",  getJobStats);

module.exports = router;