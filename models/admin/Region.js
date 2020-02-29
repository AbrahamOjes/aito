const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regionSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "country"
  },
  country_name: {
    type: String
  }
});

module.exports = Region = mongoose.model(
  "region",
  regionSchema
);
