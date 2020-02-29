const ProductCompany = require("../../models/admin/ProductCompany");

exports.getCompanies = async (req, res) => {
  try {
    const companies = await ProductCompany.find();
    if (companies.length <= 0) {
      return res.status(400).json({
        msg: "There are no Product Brand"
      });
    }
    res.json(companies);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.addCompany = async (req, res) => {
  try {
    const company = await new ProductCompany(req.body).save();
    res.json({
      message: "Successfully Saved",
      company: company
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await ProductCompany.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        msg: "Company not found"
      });
    }
    await company.remove();
    res.status(200).json({ mgs: "Company Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
