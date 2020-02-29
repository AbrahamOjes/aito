const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const outletSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  route: {
    type: Schema.Types.ObjectId,
    ref: "route"
  },
  route_name: {
    type: String
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
  phone: {
    type: String,
    unique: true
  },
  address: {
    type: String
  },
  image: {
    type: String
  },

  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Outlet = mongoose.model("outlet", outletSchema);
