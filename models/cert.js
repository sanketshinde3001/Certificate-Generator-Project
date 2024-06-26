const mongoose = require("mongoose");

const certSchema = new mongoose.Schema(
  {
    theme: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: 'abc', 
    },
    title: {
      type: String,
      default: 'abc', 
    },
    person1: {
      type: String,
      default: 'abc', 
    },
    person2: {
      type: String,
      default: 'abc', 
    },
    description: {
      type: String,
      default: 'abc', 
    },
    date: {
      type: Date,
      default: Date.now,
    },
    percentage: {
      type: Number,
      default: 1000,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const cert = mongoose.model("cert", certSchema);

module.exports = cert;