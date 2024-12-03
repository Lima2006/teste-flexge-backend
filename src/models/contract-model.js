const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  documentNumber: {
    type: String,
    required: true,
  },
  socialReason: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  dates: {
    contractStartsIn: { type: Date, required: true },
    contractEndsIn: { type: Date, required: true },
    dueDay: { type: Number, required: true },
  },
  fileUrl: String,
  products: [
    {
      name: { type: String, required: true },
      amount: Number,
      finalUnitPrice: { type: Number, required: true },
      beginningOfTerm: Date,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contract", contractSchema);
