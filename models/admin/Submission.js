const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const submissionSchema = Schema({
  image: {
    type: String,
    required: true
  },
  products: {
    type: Array,
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
  outlet_address: {
    type: String,
    required: true
  },
  route_name: {
    type: String,
    required: true
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

module.exports = Submission = mongoose.model("Submission", submissionSchema);
