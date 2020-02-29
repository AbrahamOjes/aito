const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const adminSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
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
  role: {
    type: Schema.Types.ObjectId,
    ref: "role"
  },
  role_name: {
    type: String
  },
  role_power: {
    type: Number
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model("Admin", adminSchema);
