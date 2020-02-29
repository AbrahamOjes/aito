const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const FeedbackSubjectSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = FeedbackSubject = mongoose.model(
  "feedbackSubject",
  FeedbackSubjectSchema
);
