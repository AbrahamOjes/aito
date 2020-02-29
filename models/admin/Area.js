const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const areaSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: "region"
  },
  region_name: {
    type: String
  },
  country_name: {
    type:String
  }
});

module.exports = Area = mongoose.model(
  "area",
  areaSchema
);
