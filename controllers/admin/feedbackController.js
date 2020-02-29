const Feedback = require("../../models/admin/Feedback.js");
const FeedbackSubject = require("../../models/admin/FeedbackSubject.js");
const User = require("../../models/user/User");
const Territory = require("../../models/admin/Territory");
const Outlet = require("../../models/admin/Outlet");
const Company = require("../../models/admin/ProductCompany");
const { validationResult } = require("express-validator/check");

exports.getFeedbacksByUser = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.params.user_id }).sort(
      "-date"
    );
    // console.log(feedbacks);

    if (!feedbacks) {
      return res.status(404).json({ msg: "No Feedback" });
    }
    res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.getFeedbacksByCompany = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ company: req.params.company }).sort(
      "-date"
    );
    // console.log(feedbacks);

    if (!feedbacks) {
      return res.status(404).json({ msg: "No Feedback" });
    }
    res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.addFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  return;

  try {
    const user = await User.findById(req.body.user);
    const territory = await Territory.findById(user.territory);
    const subject = await FeedbackSubject.findById(req.body.subject);
    const outlet = await Outlet.findOne({
      longitude: req.body.longitude,
      latitude: req.body.latitude
    });

    const company = await Company.findById(user.company);
    if (!user) {
      return res.status(404).json({
        msg: "User not Found"
      });
    }

    if (!subject) {
      return res.status(404).json({
        msg: "Subject not Found"
      });
    }
    if (!territory) {
      return res.status(404).json({
        msg: "Territory not Found"
      });
    }

    if (!company) {
      return res.status(404).json({
        msg: "Company not Found"
      });
    }
    let submittedOutlet = {};
    if (!outlet) {
      submittedOutlet.name = "Not Available";
    } else {
      submittedOutlet = outlet;
    }

    console.log(outlet);

    const feedback = await new Feedback({
      subject: subject._id,
      subject_name: subject.name,
      feedback: req.body.feedback,
      rating: req.body.rating,
      outlet_name: submittedOutlet.name,
      company: company._id,
      company_name: company.name,
      territory: territory._id,
      territory_name: territory.name,
      area_name: territory.area_name,
      region_name: territory.region_name,
      country_name: territory.country_name,
      user: user._id,
      user_name: user.name
    });
    await feedback.save();
    res.status(200).json({
      mgs: "Feedback submitted",
      feedback
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server Error. Try Again Later"
    });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        msg: "Feedback not found"
      });
    }

    await feedback.remove();
    res.status(200).json({
      msg: "Feedback Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
