const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
    trim: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
