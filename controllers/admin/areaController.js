const Area = require("../../models/admin/Area");
const Region = require("../../models/admin/Region");

exports.getArea = async (req, res) => {
  try {
    const areas = await Area.find();
    if (areas.length <= 0) {
      return res.status(400).json({
        msg: "No Area Found",
        areas
      });
    }
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getAreasByRegion = async (req, res) => {
  try {
    const areas = await Area.find({
      region: req.params.region_id
    });
    res.status(200).json(areas);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addArea = async (req, res) => {
  try {
    const region = await Region.findOne({
      _id: req.body.region
    });
    if (!region) {
      return res.status(404).json({
        msg: "No Region Found"
      });
    }
    const area = await new Area({
      name: req.body.name,
      region: req.body.region,
      region_name: region.name,
      country_name: region.country_name
    });
    await area.save();
    res.status(200).json({
      msg: "New Area Added",
      area
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.deleteArea = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({
        msg: "Area not Found"
      });
    }
    await area.remove();
    res.status(200).json({
      msg: "Area Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
