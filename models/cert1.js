const mongoose = require("mongoose");

const certSchema = new mongoose.Schema(
  {
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
    date: {
      type: Date,
      default: Date.now,
    },
    percentage: {
      type: Number,
      default: 90,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const cert1 = mongoose.model("cert1", certSchema);

module.exports = cert1;