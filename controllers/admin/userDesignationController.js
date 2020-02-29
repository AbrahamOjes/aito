const UserDesignation = require("../../models/admin/UserDesignation");
const { validationResult } = require("express-validator/check");

exports.getUserDesignations = async (req, res) => {
  try {
    const designation = await UserDesignation.find();
    res.status(200).json(designation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.addUserDesignation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const designation = await new UserDesignation({
      name: req.body.name,
      description: req.body.description
    });

    await designation.save();
    res.status(200).json({
      mgs: "Designation added",
      designation
    });
  } catch (error) {
    res.status(500).json({
      error: "Server Error. Try Again Later"
    });
  }
};

exports.deleteUserDesignation = async (req, res) => {
  try {
    const designation = await UserDesignation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({
        msg: "Designation not found"
      });
    }

    await designation.remove();
    res.status(200).json({
      msg: "Designation Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
