const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const productSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "brand"
  },
  brand_name: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  sub_cat_name: {
    type: String,
    required: true
  },
  cat_name: {
    type: String,
    required: true
  }
});

module.exports = Product = mongoose.model("product", productSchema);
