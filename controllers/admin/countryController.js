const Country = require("../../models/admin/Country")


exports.getCountry = async (req, res) => {
  try {
    const country = await Country.find();
    if (country.length <= 0) {
      return res.status(400).json({
        msg: "There are no Country"
      });
    }
    res.status(200).json(country);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
exports.addCountry = async (req, res) => {
  try {
    const country = await new Country({
      name: req.body.name
    })
    await country.save()
    res.status(200).json({
      msg: "Country Added",
      country
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });

  }

};
exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id)
    if (!country) {
      return res.status(404).json({
        msg:"Country not found"
      })
    }
    await country.remove();
    res.status(200).json({
      msg: "Country Deleted"
    })

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });

  }

}
