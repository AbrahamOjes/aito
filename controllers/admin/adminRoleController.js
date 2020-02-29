const AdminRole = require("../../models/admin/AdminRoles.js");
const { validationResult } = require("express-validator/check");

exports.getAdminRoles = async (req, res) => {
  try {
    const roles = await AdminRole.find();
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.addAdminRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const role = await new AdminRole({
      name: req.body.name,
      power: req.body.power,
      description: req.body.description
    });

    await role.save();
    res.status(200).json({
      mgs: "Role added",
      role
    });
  } catch (error) {
    res.status(500).json({
      error: "Server Error. Try Again Later"
    });
  }
};

exports.deleteAdminRole = async (req, res) => {
  try {
    const role = await AdminRole.findById(req.params.id);
    if (!role) {
      return res.status(404).json({
        msg: "Role not found"
      });
    }

    await role.remove();
    res.status(200).json({
      msg: "Area Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
