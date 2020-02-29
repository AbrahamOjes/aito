const Territory = require("../../models/admin/Territory");
const Route = require("../../models/admin/Route");

exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    if (routes.length <= 0) {
      return res.status(400).json({
        msg: "No Route Found"
      });
    }
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getRoutesByTerritory = async (req, res) => {
  try {
    const routes = await Route.find({
      territory: req.params.territory_id
    });
    res.status(200).json(routes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addRoute = async (req, res) => {
  try {
    const territory = await Territory.findOne({
      _id: req.body.territory
    });
    if (!territory) {
      return res.status(404).json({
        msg: "No Territory Found"
      });
    }
    const route = await new Route({
      name: req.body.name,
      territory: req.body.territory,
      territory_name: territory.name,
      area_name: territory.area_name,
      region_name: territory.region_name,
      country_name: territory.country_name
    });
    await route.save();
    res.status(200).json({
      msg: "New Route Added",
      route
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({
        msg: "Route ID  not Found"
      });
    }
    await route.remove();
    res.status(200).json({
      msg: "Route Deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
