const SOSTarget = require("../../models/admin/SOSTarget");
const Territory = require("../../models/admin/Territory");
const ProductCompany = require("../../models/admin/ProductCompany");
const Admin = require("../../models/admin/Admin");
const mongoose = require("mongoose");

exports.getSosTarget = async (req, res) => {
  try {
    const sosTarget = await SOSTarget.find({ company: req.params.id });

    if (sosTarget.length <= 0) {
      return res.status(400).json({
        msg: "No Target Found"
      });
    }
    res.status(200).json(sosTarget);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// exports.getTerritoriesByArea = async (req, res) => {
//     try {
//         const territories = await Territory.find({
//             area: req.params.area_id
//         });
//         res.status(200).json(territories);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: error.message });
//     }
// };

exports.addSosTarget = async (req, res) => {
  try {
    const territory = await Territory.findOne({
      _id: req.body.territory
    });
    const company = await ProductCompany.findById(req.body.company);
    const product = await Product.findById(req.body.product);

    const duplicate = await SOSTarget.findOne({
      company: req.body.company,
      territory: req.body.territory,
      product: req.body.product
    });

    if (duplicate) {
      return res.status(501).json({
        msg: "Entry Already exist"
      });
    }

    if (!territory) {
      return res.status(404).json({
        msg: "No Territory Found"
      });
    }

    if (!company) {
      return res.status(404).json({
        msg: "No Company Found"
      });
    }

    if (!product) {
      return res.status(404).json({
        msg: "No Product Found"
      });
    }

    const sosTarget = await new SOSTarget({
      target: req.body.target,
      product: req.body.product,
      product_name: product.name,
      territory: territory._id,
      territory_name: territory.name,
      area: territory.area_name,
      area_name: territory.area_name,
      region_name: territory.region_name,
      country_name: territory.country_name,
      company: company._id,
      company_name: company.name
    });
    await sosTarget.save();
    res.status(200).json({
      msg: "New Target Added",
      sosTarget
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.updateSosTarget = async (req, res) => {
  try {
    const target = await SOSTarget.findById(req.params.id);
    const territory = await Territory.findOne({
      _id: req.body.territory
    });
    const company = await ProductCompany.findById(req.body.company);
    const product = await Product.findById(req.body.product);

    const duplicate = await SOSTarget.findOne({
      company: req.body.company,
      territory: req.body.territory,
      product: req.body.product,
      target: req.body.form_target
    });

    if (duplicate) {
      return res.status(501).json({
        msg: "Entry Already exist"
      });
    }

    if (!territory) {
      return res.status(404).json({
        msg: "No Territory Found"
      });
    }

    if (!company) {
      return res.status(404).json({
        msg: "No Company Found"
      });
    }

    if (!product) {
      return res.status(404).json({
        msg: "No Product Found"
      });
    }

    target.territory = territory._id;
    target.territory_name = territory.name;
    target.area_name = territory.area_name;
    target.region_name = territory.region_name;
    target.country_name = territory.country_name;
    target.product = product._id;
    target.product_name = product.name;
    target.target = req.body.form_target;

    await target.save();
    res.status(200).json({
      msg: "New Target Added",
      target
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.deleteSosTarget = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    const sosTarget = await SOSTarget.findById(req.params.id);
    if (!sosTarget) {
      return res.status(404).json({
        msg: "Target not Found"
      });
    }

    // const adminCom = String(admin.company);
    // const sosTarCom = String(sosTarget.company);
    // return console.log(adminCom !== sosTarCom);

    if (String(sosTarget.company) !== String(admin.company)) {
      console.log(String(sosTarget.company), String(admin.company));
      return res.status(401).json({
        error: { msg: "Not Authorized" }
      });
    }

    await sosTarget.remove();
    res.status(200).json({
      msg: "Target Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
