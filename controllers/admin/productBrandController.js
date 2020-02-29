const ProductCompany = require("../../models/admin/ProductCompany");
const ProductBrand = require("../../models/admin/ProductBrand");

exports.getBrands = async (req, res) => {
  try {
    const brand = await ProductBrand.find().populate("company");
    if (brand.length <= 0) {
      return res.status(400).json({
        msg: "There are no Product Brand"
      });
    }
    res.status(200).json(brand);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getBrandsByCompany = async (req, res) => {
  try {
    const brands = await ProductBrand.find({
      company: req.params.company_id
    });
    res.status(200).json(brands);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addBrand = async (req, res) => {
  const company = await ProductCompany.findOne({ _id: req.body.company });
  try {
    const brand = await new ProductBrand({
      name: req.body.name,
      company: req.body.company,
      company_name: company.name
    });

    await brand.save();
    res.status(200).json({
      msg: "Brand Added",
      brand: brand
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const brand = await ProductBrand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({
        msg: "Brand not found"
      });
    }
    await brand.remove();
    res.status(200).json({ mgs: "Brand Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
