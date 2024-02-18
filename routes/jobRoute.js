const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/jobs.controller");
const authenticateToken = require('../middleware/authtoken');

router.post("/create", authenticateToken, createJob);

module.exports = router;