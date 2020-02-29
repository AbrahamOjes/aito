const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ProductCategorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = ProductCategory = mongoose.model(
  "category",
  ProductCategorySchema
);
