const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const productBrandSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  company_name: {
    type: String
  }
});

module.exports = ProductBrand = mongoose.model("brand", productBrandSchema);
