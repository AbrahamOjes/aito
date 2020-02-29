const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const productSubCategorySchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  cat_name: {
    type: String
  }
});

module.exports = ProductSubCategory = mongoose.model(
  "subCategory",
  productSubCategorySchema
);
