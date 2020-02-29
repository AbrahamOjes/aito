const Route = require("../../models/admin/Route");
const Outlet = require("../../models/admin/Outlet");

exports.getOutletsByUser = async (req, res) => {
  try {
    const outlets = await Outlet.find({ user: req.params.user_id });
    if (outlets.length <= 0) {
      return res.status(400).json({
        msg: "No Outlet Found"
      });
    }
    res.status(200).json(outlets);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.find();
    if (outlets.length <= 0) {
      return res.status(400).json({
        msg: "No Outlet Found"
      });
    }
    res.status(200).json(outlets);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getOutletsByCompany = async (req, res) => {
  try {
    const outlets = await Outlet.find({ company: req.params.company });
    if (outlets.length <= 0) {
      return res.status(400).json({
        msg: "No Outlet Found"
      });
    }
    res.status(200).json(outlets);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.addOutlet = async (req, res) => {
  try {
    const route = await Route.findOne({
      _id: req.body.route
    });
    if (!route) {
      return res.status(404).json({
        msg: "No Territory Found"
      });
    }
    const outlet = await new Outlet({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      image: req.body.image,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      user: req.body.user,
      route: req.body.route,
      route_name: route.name,
      territory_name: route.territory_name,
      area_name: route.area_name,
      region_name: route.region_name,
      country_name: route.country_name
    });
    await outlet.save();
    res.status(201).json({
      msg: "New Outlet Added",
      outlet
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.deleteOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.findById(req.params.id);
    if (!outlet) {
      return res.status(404).json({
        msg: "Outlet  not Found"
      });
    }
    await outlet.remove();
    res.status(200).json({
      msg: "Outlet Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
