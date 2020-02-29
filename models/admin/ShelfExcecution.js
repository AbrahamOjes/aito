const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const shelfExecutionSchema = Schema({
  image: {
    type: String,
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
  msl: {
    type: Number,
    required: true
  },
  sos: {
    type: Number,
    required: true
  },
  facing: {
    type: Number,
    required: true
  },
  outlet: {
    type: Schema.Types.ObjectId,
    ref: "outlet"
  },
  outlet_name: {
    type: String,
    required: true
  },
  route_name: {
    type: String
  },
  territory_name: {
    type: String
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
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  company_name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  user_name: {
    type: String
  },
  flaged: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ShelfExcecution = mongoose.model(
  "shelfExecution",
  shelfExecutionSchema
);
