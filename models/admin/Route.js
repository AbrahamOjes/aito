const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  }
});

module.exports = Outlet = mongoose.model("route", routeSchema);
