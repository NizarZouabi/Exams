const jwt = require("jsonwebtoken");
const keyone = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    return res.status(401).json({
      verified: false,
      message: "Please login to access this page.",
    });
  }
  jwt.verify(token, keyone, (err, payload) => {
    if (err) {
      return res.status(401).json({
        verified: false,
        message: "Please login to access this page.",
      });
    } else {
      req.userId = payload.userId;
      next();
    }
  });
};