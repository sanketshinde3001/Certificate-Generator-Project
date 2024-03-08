const mongoose = require("mongoose");

const certSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'ABCD', 
    },
    title: {
      type: String,
      default: 'Web Developer Certificate', 
    },
    person1: {
      type: String,
      default: 'Mr XYZ', 
    },
    person2: {
      type: String,
      default: 'MR XYZ', 
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const cert = mongoose.model("cert", certSchema);

module.exports = cert;