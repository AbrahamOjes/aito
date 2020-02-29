const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const feedbackSchema = Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: "feedbackSubject"
  },
  subject_name: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  product_name: {
    type: String
  },
  outlet_name: {
    type: String
  },
  territory: {
    type: Schema.Types.ObjectId,
    ref: "territory"
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Feedback = mongoose.model("Feedback", feedbackSchema);
