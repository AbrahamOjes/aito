const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //get token from header

  const userToken = req.header("user-auth-token");

  //check if not token
  if (!userToken) {
    return res.status(401).json({ msg: "No Token, Authorization Denied" });
  }

  //Verify token

  try {
    const decoded = jwt.verify(userToken, config.get("jwtUserAuthSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "User Token is not valid" });
  }
};
