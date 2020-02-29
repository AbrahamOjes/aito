const VisitTarget = require("../../models/admin/VisitTarget");
const Territory = require("../../models/admin/Territory");
const ProductCompany = require("../../models/admin/ProductCompany");
const Admin = require("../../models/admin/Admin");

exports.getVisitTarget = async (req, res) => {
  try {
    const visitTarget = await VisitTarget.find({
      company: req.params.id
    });

    if (visitTarget.length <= 0) {
      return res.status(400).json({
        msg: "No Target Found"
      });
    }
    res.status(200).json(visitTarget);
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

exports.updateVisitTarget = async (req, res) => {
  try {
    const target = await VisitTarget.findById(req.params.id);
    const territory = await Territory.findOne({
      _id: req.body.territory
    });
    const company = await ProductCompany.findById(req.body.company);

    const duplicate = await VisitTarget.findOne({
      company: req.body.company,
      territory: req.body.territory,
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

    target.territory = territory._id;
    target.territory_name = territory.name;
    target.area_name = territory.area_name;
    target.region_name = territory.region_name;
    target.country_name = territory.country_name;
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

exports.addVisitTarget = async (req, res) => {
  try {
    const territory = await Territory.findOne({
      _id: req.body.territory
    });
    const company = await ProductCompany.findById(req.body.company);

    const duplicate = await VisitTarget.findOne({
      company: req.body.company,
      territory: req.body.territory
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

    const visitTarget = await new VisitTarget({
      target: req.body.target,
      territory: territory._id,
      territory_name: territory.name,
      area: territory.area_name,
      area_name: territory.area_name,
      region_name: territory.region_name,
      country_name: territory.country_name,
      company: company._id,
      company_name: company.name
    });
    await visitTarget.save();
    res.status(200).json({
      msg: "New Target Added",
      visitTarget
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.deleteVisitTarget = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    const visitTarget = await VisitTarget.findById(req.params.id);
    if (!visitTarget) {
      return res.status(404).json({
        msg: "Target not Found"
      });
    }

    // const adminCom = String(admin.company);
    // const sosTarCom = String(visitTarget.company);
    // return console.log(adminCom !== sosTarCom);

    if (String(visitTarget.company) !== String(admin.company)) {
      console.log(String(visitTarget.company), String(admin.company));
      return res.status(401).json({
        error: { msg: "Not Authorized" }
      });
    }

    await visitTarget.remove();
    res.status(200).json({
      msg: "Target Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
