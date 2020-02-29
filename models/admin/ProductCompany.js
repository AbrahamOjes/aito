const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const productCompanySchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "admin"
  },
  admin_name: {
    type: String
  },
  admin_phone: {
    type: String
  }
});

module.exports = ProductCompany = mongoose.model(
  "company",
  productCompanySchema
);
