const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const redis = require("redis");

function authenticateToken(req, res, next) {
  // Verify JWT token
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(401).send({ error: "No Token Provided" });
  }
  let token = authHeader.split(" ")[1];
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.status(500).send({ error: "Authentication Feild" });
    } else {
      console.log({decoded});
      req.user= decoded.id
      next()
    //   res.send({messegae:"Success"})
    }
  });
}

module.exports = authenticateToken;
