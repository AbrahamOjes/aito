const ProductCategory = require("../../models/admin/ProductCategory");

exports.categories = async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.addCategory = async (req, res) => {
  try {
    const category = await new ProductCategory(req.body).save();
    res.json({
      message: "Successfully Saved",
      category: category
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        msg: "Category not found"
      });
    }
    await category.remove();
    res.status(200).json({ mgs: "Category Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
