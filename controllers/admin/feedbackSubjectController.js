const FeedbackSubject = require("../../models/admin/FeedbackSubject");
const { validationResult } = require("express-validator/check");

exports.getFeedbackSubjects = async (req, res) => {
  try {
    const subjects = await FeedbackSubject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.addFeedbackSubject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const subject = await new FeedbackSubject({
      name: req.body.name
    });

    await subject.save();
    res.status(200).json({
      mgs: "Subject added",
      subject
    });
  } catch (error) {
    res.status(500).json({
      error: "Server Error. Try Again Later"
    });
  }
};

exports.deleteFeedbackSubject = async (req, res) => {
  try {
    const subject = await FeedbackSubject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        msg: "Subject not found"
      });
    }

    await subject.remove();
    res.status(200).json({
      msg: "subject Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
