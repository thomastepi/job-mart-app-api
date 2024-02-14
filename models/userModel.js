const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastName: { type: String, default: "lastName" },
    location: { type: String, default: "myCity" },
  },
  {
    collection: "job-mart-users",
    timestamps: true,
  }
);

const User = mongoose.model("User", schema);

module.exports = User;