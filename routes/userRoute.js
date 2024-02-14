const express = require("express");
const router = express.Router();
const { login, register, updateUser } = require("../controllers/users.controller");
const authenticateToken = require('../middleware/authtoken');


router.post("/register", register);
router.post("/login", login);
router.patch("/update", authenticateToken,  updateUser);


module.exports = router;

