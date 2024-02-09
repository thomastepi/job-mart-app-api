const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const authenticateToken = require("../middleware/authtoken");

const saltRounds = 10;


async function register(req, res) {
    const { name, email, password } = req.body;
    const user = await User
        .findOne({ email })
        .catch((err) => {
            console.error("Error: ", err);
            res.status(500).send("Internal server error");
        });
    if (user) {
        res.status(400).send("User already exists");
    } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name, email, password: hashedPassword });
        newUser
            .save()
            .then((user) => {
                res.status(201).send(user);
            })
            .catch((err) => {
                console.error("Error: ", err);
                res.status(500).send("Internal server error");
            });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User
        .findOne({ email })
        .catch((err) => {
            console.error("Error: ", err);
            res.status(500).send("Internal server error");
        });
    if (!user) {
        res.status(404).send("User not found");
    } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN);
            res.status(200).send({ accessToken });
        } else {
            res.status(401).send("Invalid password");
        }
    }
}

module.exports = {
    register,
    login
};