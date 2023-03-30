const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const redis = require("redis");

function authenticateToken(req, res, next) {
  // Verify JWT token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
