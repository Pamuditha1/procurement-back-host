const jwt = require("jsonwebtoken");

module.exports = function (req, res, next, role) {
  const token = req.header("auth-token");

  if (!token)
    return res.status(401).send("Access Denied. Please Login to Continue");

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;

    if (role && req.user.type !== role)
      return res.status(403).send("Access Denied. You have no access");

    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
};
