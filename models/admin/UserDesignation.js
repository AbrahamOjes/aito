const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserDesignationSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = UserDesignation = mongoose.model(
  "designation",
  UserDesignationSchema
);
