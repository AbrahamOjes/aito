const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const territorySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: "area"
  },
  area_name: {
    type: String
  },
  region_name: {
    type: String
  },
  country_name: {
    type:String
  }
});

module.exports = Territory = mongoose.model(
  "territory",
  territorySchema
);
