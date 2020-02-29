const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sosTargetSchema = Schema({
  target: {
    type: Number,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  product_name: {
    type: String,
    required: true
  },
  territory: {
    type: Schema.Types.ObjectId,
    ref: "territory"
  },
  area_name: {
    type: String
  },
  region_name: {
    type: String
  },
  country_name: {
    type: String
  },
  territory_name: {
    type: String
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  company_name: {
    type: String
  }
});

module.exports = SOSTarget = mongoose.model("sosTarget", sosTargetSchema);
