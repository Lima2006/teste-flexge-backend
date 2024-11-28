const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Company", CompanySchema);
