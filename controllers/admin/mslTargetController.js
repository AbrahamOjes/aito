const MSLTarget = require("../../models/admin/MSLTarget");
const Territory = require("../../models/admin/Territory");
const ProductCompany = require("../../models/admin/ProductCompany");
const Admin = require("../../models/admin/Admin");

exports.getMslTarget = async (req, res) => {
  try {
    const mslTarget = await MSLTarget.find({
      company: req.params.id
    });

    if (mslTarget.length <= 0) {
      return res.status(400).json({
        msg: "No Target Found"
      });
    }
    res.status(200).json(mslTarget);
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

exports.addMslTarget = async (req, res) => {
  try {
    // let products = [];

    // req.body.product.forEach(product => {
    //   Product.findById(product).then(data => {
    //     console.log({ product: data._id, product_name: data.name });
    //     products.push({ product: data._id, product_name: data.name });
    //   });
    // });
    const territory = await Territory.findOne({
      _id: req.body.territory
    });
    const company = await ProductCompany.findById(req.body.company);

    const duplicate = await MSLTarget.findOne({
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

    const mslTarget = await new MSLTarget({
      target: req.body.target,
      products: req.body.product,
      territory: territory._id,
      territory_name: territory.name,
      area: territory.area_name,
      area_name: territory.area_name,
      region_name: territory.region_name,
      country_name: territory.country_name,
      company: company._id,
      company_name: company.name
    });
    await mslTarget.save();
    res.status(200).json({
      msg: "New Target Added",
      mslTarget
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.updateMslTarget = async (req, res) => {
  try {
    const target = await MSLTarget.findById(req.params.id);
    const territory = await Territory.findOne({
      _id: req.body.territory
    });
    const company = await ProductCompany.findById(req.body.company);

    const duplicate = await MSLTarget.findOne({
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

    target.territory = territory._id;
    target.territory_name = territory.name;
    target.area_name = territory.area_name;
    target.region_name = territory.region_name;
    target.country_name = territory.country_name;
    target.products = req.body.product;
    target.target = req.body.form_target;
    console.log(target.product, req.body.product);
    await target.save();
    console.log(target);
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

exports.deleteMslTarget = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    const mslTarget = await MSLTarget.findById(req.params.id);
    if (!mslTarget) {
      return res.status(404).json({
        msg: "Target not Found"
      });
    }

    // const adminCom = String(admin.company);
    // const sosTarCom = String(mslTarget.company);
    // return console.log(adminCom !== sosTarCom);

    if (String(mslTarget.company) !== String(admin.company)) {
      console.log(String(mslTarget.company), String(admin.company));
      return res.status(401).json({
        error: { msg: "Not Authorized" }
      });
    }

    await mslTarget.remove();
    res.status(200).json({
      msg: "Target Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
