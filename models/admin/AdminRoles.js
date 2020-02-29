const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const AdminRoleSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  power: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = AdminRole = mongoose.model("role", AdminRoleSchema);
