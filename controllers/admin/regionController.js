const Region = require("../../models/admin/Region");
const Country = require("../../models/admin/Country");

exports.getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    if (regions.length <= 0) {
      return res.status(400).json({
        msg: "There are no Regions"
      });
    }
    res.status(200).json(regions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getRegionsByCountry = async (req, res) => {
  try {
    const regions = await Region.find({
      country: req.params.country_id
    });
    res.status(200).json(regions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addRegion = async (req, res) => {
  try {
    const countryFound = await Country.findOne({
      _id: req.body.country
    });
    if (!countryFound) {
      return res.status(404).json({
        msg: "No Country Found"
      });
    }
    const region = await new Region({
      name: req.body.name,
      country: req.body.country,
      country_name: countryFound.name
    });
    await region.save();
    res.status(200).json({
      msg: "New Region Added",
      region
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.deleteRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (!region) {
      return res.status(404).json({
        msg: "Region not Found"
      });
    }
    await region.remove();
    res.status(200).json({
      msg: "Region Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
exports.getRegion = async (req, res) => {
  try {
    const region = await Region.find();
    if (region.length <= 0) {
      return res.status(400).json({
        msg: "There are no Region"
      });
    }
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
