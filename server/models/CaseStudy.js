const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  sourceLink: String,
});

module.exports = mongoose.model("CaseStudy", CaseSchema);