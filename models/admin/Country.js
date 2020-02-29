const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  }
});

module.exports = Country = mongoose.model(
  "country",
  countrySchema
);
