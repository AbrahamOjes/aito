const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //get token from header

  const token = req.header("admin-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No User Token, Authorization Denied" });
  }

  //Verify token

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.admin = decoded.admin;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
