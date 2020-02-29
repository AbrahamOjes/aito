const ProductSubCategory = require("../../models/admin/ProductSubCategory");
const ProductCategory = require("../../models/admin/ProductCategory");

exports.getSubCategory = async (req, res) => {
  try {
    const subCategories = await ProductSubCategory.find().populate(
      "ProductCategory"
    );
    if (subCategories.length <= 0) {
      res.status(400).json({
        msg: "There are no sub categories"
      });
    }
    res.status(200).json(subCategories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getSubCategoryByCategory = async (req, res) => {
  try {
    const subCategories = await ProductSubCategory.find({
      category: req.params.cat_id
    });
    res.status(200).json(subCategories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addSubCategory = async (req, res) => {
  const category = await ProductCategory.findOne({ _id: req.body.category });
  try {
    const subCategory = await new ProductSubCategory({
      name: req.body.name,
      category: req.body.category,
      cat_name: category.name
    });

    await subCategory.save();
    res.status(200).json({
      msg: "Sub Category Added",
      subCategory: subCategory
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await ProductSubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({
        msg: "Category not found"
      });
    }
    await subCategory.remove();
    res.status(200).json({ mgs: "SubCategory Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
