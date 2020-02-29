const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  designation: {
    type: Schema.Types.ObjectId,
    ref: "designation"
  },
  designation_name: {
    type: String
  },
  territory: {
    type: Schema.Types.ObjectId,
    ref: "territory"
  },
  territory_name: {
    type: String
  },
  routes: {
    type: Array
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  company_name: {
    type: String
  },
  avatar: {
    type: String
  },
  completed: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", userSchema);
