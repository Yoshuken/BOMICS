const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(200).json({ status: 403, message: "No token was received" });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_WORD);
    req.email = payload.email;
    next();
  } catch (error) {
    return res.status(200).json({ status: 403, message: "Invalid Token" });
  }
}

module.exports = verifyToken;
