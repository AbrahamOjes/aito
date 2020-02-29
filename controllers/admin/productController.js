const Product = require("../../models/admin/Product");
const ProductBrand = require("../../models/admin/ProductBrand");
const ProductCompany = require("../../models/admin/ProductCompany");
const ProductCategory = require("../../models/admin/ProductCategory");
const ProductSubCategory = require("../../models/admin/ProductSubCategory");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length <= 0) {
      return res.status(400).json({
        msg: "There is no Products or SKUS"
      });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByCompany = async (req, res) => {
  try {
    const products = await Product.find({ company: req.params.company_id });
    console.log(products);
    if (products.length <= 0) {
      return res.status(400).json({
        msg: "There is no Products or SKUS"
      });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const brand = await ProductBrand.findOne({ _id: req.body.brand });
  const company = await ProductCompany.findOne({ _id: req.body.company });
  const category = await ProductCategory.findOne({ _id: req.body.category });
  const subCategory = await ProductSubCategory.findOne({
    _id: req.body.subCategory
  });

  try {
    const product = await new Product({
      name: req.body.sku,
      brand: req.body.brand,
      brand_name: brand.name,
      company: company._id,
      company_name: company.name,
      sub_cat_name: subCategory.name,
      cat_name: category.name
    });
    await product.save();
    res.status(200).json({
      msg: "Product Added",
      product: product
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        msg: "Product not found"
      });
    }
    await product.remove();
    res.status(200).json({ mgs: "Product Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
