const jwt = require("jsonwebtoken");
const userToken = require("../models/userToken");
const token1 =
  "eyJhbGciOiJIUzI1NiJ9.VXNlciAwMQ.1wjs8SeX3txl0azFJGkKLHuNGNl1T8bw0jCmrWivpSU";
const token2 =
  "eyJhbGciOiJIUzI1NiJ9.VXNlciAwMg.E_x4t0QqrSuRCHdTz8sdgWBdHFKJcRGMHiSJ_qjHkgs";

exports.authorization = (req, res, next) => {
  const userId = req.body.userId;
  userToken.fetchAll((userToken) => {
    const [user] = userToken.filter((item) => item.userId === userId);
    if (!user) {
      res.status(401).send("Unauthorize");
    } else {
      const accessToken = jwt.sign(userId, user.token);
      res.json({ accessToken });
    }
  });
};

exports.authToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    const checkToken = token === token1 || token === token2;
    if (checkToken) {
      next();
    } else res.status(401).send("Unauthorize");
  } else res.status(401).send("Unauthorize");
};
