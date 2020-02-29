const Area = require("../../models/admin/Area");
const Territory = require("../../models/admin/Territory");

exports.getTerritory = async (req, res) => {
  try {
    const territories = await Territory.find();
    if (territories.length <= 0) {
      return res.status(400).json({
        msg: "No Territory Found"
      });
    }
    res.status(200).json(territories);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getTerritoriesByArea = async (req, res) => {
  try {
    const territories = await Territory.find({
      area: req.params.area_id
    });
    res.status(200).json(territories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addTerritory = async (req, res) => {
  try {
    const area = await Area.findOne({
      _id: req.body.area
    });
    if (!area) {
      return res.status(404).json({
        msg: "No Area Found"
      });
    }
    const territory = await new Territory({
      name: req.body.name,
      area: req.body.area,
      area_name: area.name,
      region_name: area.region_name,
      country_name: area.country_name
    });
    await territory.save();
    res.status(200).json({
      msg: "New Territory Added",
      territory
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.deleteTerritory = async (req, res) => {
  try {
    const territory = await Territory.findById(req.params.id);
    if (!territory) {
      return res.status(404).json({
        msg: "Territory ID  not Found"
      });
    }
    await territory.remove();
    res.status(200).json({
      msg: "Territory Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
